import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'

const Home = () => {

  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(
      "https://foodstream-backend.onrender.com/api/food",
      { withCredentials: true }
    )
      .then(res => {
        setVideos(res.data.foodItems)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false)
      })
  }, [])
  function increaseCommentCount(foodId) {
  setVideos(prev =>
    prev.map(v =>
      v._id === foodId
        ? {
            ...v,
            commentsCount: (v.commentsCount ?? 0) + 1
          }
        : v
    )
  );
}

  async function likeVideo(item) {
    try {
      const response = await axios.post(
        "https://foodstream-backend.onrender.com/api/food/like",
        { foodId: item._id },
        { withCredentials: true }
      )

      setVideos(prev =>
        prev.map(v => {
          if (v._id !== item._id) return v
         if (response.data.liked) {
          return {
            ...v, 
            liked: true,
            likeCount: (v.likeCount ?? 0) + 1
          }
        } else {
          return {
            ...v,
            liked: false,
            likeCount: Math.max(0, (v.likeCount ?? 0) - 1)
          }
        }
        })
      )
    } catch (err) {
      console.log("Like error", err)
    }
  }

  async function saveVideo(item) {
    try {
      const res = await axios.post(
        "https://foodstream-backend.onrender.com/api/food/save",
        { foodId: item._id },
        { withCredentials: true }
      )

      setVideos(prev =>
        prev.map(v =>
          v._id === item._id
            ? {
              ...v,
              saved: !!res.data.save,
              savesCount: res.data.save
              ? (v.savesCount ?? 0) + 1
              : Math.max(0, (v.savesCount ?? 0) - 1)
            }
            : v
        )
      )
    } catch (err) {
      console.log("Save error", err)
    }
  }

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#000",
          color: "#fff",
          fontSize: "22px",
          fontWeight: "bold"
        }}
      >
        Loading...
      </div>
    )
  }

  return (
    <ReelFeed
      items={videos}
      onLike={likeVideo}
      onSave={saveVideo}
      onComment={increaseCommentCount}
      emptyMessage="No videos available."
    />
  )
}

export default Home