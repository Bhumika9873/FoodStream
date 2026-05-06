import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'

const Home = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/api/food", { withCredentials: true })
      .then(res => setVideos(res.data.foodItems))
      .catch(err => console.log(err))
  }, [])

  async function likeVideo(item) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/like",
        { foodId: item._id },
        { withCredentials: true }
      )

      setVideos(prev =>
        prev.map(v => {
          if (v._id !== item._id) return v
          if (response.data.liked) {
            return { ...v, likeCount: (v.likeCount ?? 0) + 1 }
          } else {
            return { ...v, likeCount: Math.max(0, (v.likeCount ?? 0) - 1) }
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
        "http://localhost:3000/api/food/save",
        { foodId: item._id },
        { withCredentials: true }
      )

      setVideos(prev =>
        prev.map(v =>
          v._id === item._id
            ? { ...v, savesCount: res.data.save ? v.savesCount + 1 : v.savesCount - 1 }
            : v
        )
      )
    } catch (err) {
      console.log("Save error", err)
    }
  }

  return (
    <ReelFeed
      items={videos}
      onLike={likeVideo}
      onSave={saveVideo}
      emptyMessage="No videos available."
    />
  )
}

export default Home
