import React, { useEffect, useState } from 'react'
import '../../styles/reels.css'
import axios from 'axios'
import ReelFeed from '../../components/ReelFeed'

const Saved = () => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/food/save", { withCredentials: true })
            .then(response => {
                const savedFoods = response.data.savedFoods.map(item => ({
                    _id: item.food._id,
                    video: item.food.video,
                    description: item.food.description,
                    likeCount: item.food.likeCount,
                    savesCount: item.food.savesCount,
                    commentsCount: item.food.commentsCount,
                    foodPartner: item.food.foodPartner,
                }))
                setVideos(savedFoods)
            })
            .catch(err => console.log(err))
    }, [])

    const removeSaved = async (item) => {
        try {
            await axios.post(
                "http://localhost:3000/api/food/save",
                { foodId: item._id },
                { withCredentials: true }
            )

            // 🔥 Saved list se hata do
            setVideos(prev => prev.filter(v => v._id !== item._id))
        } catch (err) {
            console.log("Remove saved error", err)
        }
    }

    return (
        <ReelFeed
            items={videos}
            onSave={removeSaved}
            emptyMessage="No saved videos yet."
        />
    )
}

export default Saved
