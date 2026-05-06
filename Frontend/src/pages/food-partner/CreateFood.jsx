import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import '../../styles/create-food.css';
import { useNavigate } from 'react-router-dom';

const CreateFood = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [videoURL, setVideoURL] = useState('');
    const [fileError, setFileError] = useState('');
    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!videoFile) {
            setVideoURL('');
            return;
        }
        const url = URL.createObjectURL(videoFile);
        setVideoURL(url);
        return () => URL.revokeObjectURL(url);
    }, [videoFile]);

    const onFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) {
            setVideoFile(null);
            setFileError('');
            return;
        }
        if (!file.type.startsWith('video/')) {
            setFileError('Please select a valid video file.');
            return;
        }
        setFileError('');
        setVideoFile(file);
    };

    const onDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer?.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('video/')) {
            setFileError('Please drop a valid video file.');
            return;
        }
        setFileError('');
        setVideoFile(file);
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    const openFileDialog = () => fileInputRef.current?.click();

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('video', videoFile);

            const response = await axios.post(
                'http://localhost:3000/api/food',
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.error('Create food error:', error.response?.data || error.message);
            alert('Food create failed. Check console.');
        }
    };

    const isDisabled = useMemo(() => !name.trim() || !videoFile, [name, videoFile]);

    return (
        <div className="create-food-page">
            <div className="create-food-card">
                <header className="create-food-header">
                    <h1 className="create-food-title">Create Food</h1>
                    <p className="create-food-subtitle">
                        Upload a short video, give it a name, and add a description.
                    </p>
                </header>

                <form className="create-food-form" onSubmit={onSubmit}>
                    <div className="field-group">
                        <label htmlFor="foodVideo">Food Video</label>
                        <input
                            id="foodVideo"
                            ref={fileInputRef}
                            className="file-input-hidden"
                            type="file"
                            accept="video/*"
                            onChange={onFileChange}
                        />

                        <div
                            className="file-dropzone"
                            role="button"
                            tabIndex={0}
                            onClick={openFileDialog}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    openFileDialog();
                                }
                            }}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                        >
                            <div className="file-dropzone-inner">
                                <strong>Tap to upload</strong> or drag and drop
                                <div className="file-hint">MP4, WebM, MOV</div>
                            </div>
                        </div>

                        {fileError && <p className="error-text">{fileError}</p>}

                        {videoFile && (
                            <div className="file-chip">
                                <span>{videoFile.name}</span>
                                <span>{(videoFile.size / 1024 / 1024).toFixed(1)} MB</span>
                            </div>
                        )}
                    </div>

                    {videoURL && (
                        <div className="video-preview">
                            <video src={videoURL} controls />
                        </div>
                    )}

                    <div className="field-group">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="field-group">
                        <label>Description</label>
                        <textarea
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <button className="btn-primary" type="submit" disabled={isDisabled}>
                        Save Food
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateFood;
