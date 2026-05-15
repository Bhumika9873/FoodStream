// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import '../../styles/reels.css'
// import ReelFeed from '../../components/ReelFeed'

// const Home = () => {
//   const [videos, setVideos] = useState([])

//   useEffect(() => {
//     axios.get("http://localhost:3000/api/food", { withCredentials: true })
//       .then(res => setVideos(res.data.foodItems))
//       .catch(err => console.log(err))
//   }, [])

//   async function likeVideo(item) {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/food/like",
//         { foodId: item._id },
//         { withCredentials: true }
//       )

//       setVideos(prev =>
//         prev.map(v => {
//           if (v._id !== item._id) return v
//           if (response.data.liked) {
//             return { ...v, likeCount: (v.likeCount ?? 0) + 1 }
//           } else {
//             return { ...v, likeCount: Math.max(0, (v.likeCount ?? 0) - 1) }
//           }
//         })
//       )
//     } catch (err) {
//       console.log("Like error", err)
//     }
//   }

//   async function saveVideo(item) {
//     try {
//       const res = await axios.post(
//         "http://localhost:3000/api/food/save",
//         { foodId: item._id },
//         { withCredentials: true }
//       )

//       setVideos(prev =>
//         prev.map(v =>
//           v._id === item._id
//             ? { ...v, savesCount: res.data.save ? v.savesCount + 1 : v.savesCount - 1 }
//             : v
//         )
//       )
//     } catch (err) {
//       console.log("Save error", err)
//     }
//   }

//   return (
//     <ReelFeed
//       items={videos}
//       onLike={likeVideo}
//       onSave={saveVideo}
//       emptyMessage="No videos available."
//     />
//   )
// }

// export default Home
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/reels.css'

const Home = () => {

    const navigate = useNavigate()

    return (
        <div className="home-page">

            {/* NAVBAR */}

            <nav className="navbar">

                <h1 className="logo">FoodStream</h1>

                <div className="nav-links">

                    <Link to="/">Home</Link>

                    <Link to="/user/login">User Login</Link>

                    <Link to="/user/register">User Signup</Link>

                    <Link to="/food-partner/login">Partner Login</Link>

                    <Link to="/food-partner/register">Partner Signup</Link>

                </div>

            </nav>

            {/* HERO SECTION */}

            <section className="hero-section">

                <div className="hero-content">

                    <h1>
                        Discover Viral Food Around You
                    </h1>

                    <p>
                        Watch trending food reels, explore restaurants,
                        and share your delicious creations with the world.
                    </p>

                    <div className="hero-buttons">

                        <button
                            className="primary-btn"
                            onClick={() => navigate('/user/login')}
                        >
                            Explore Feed
                        </button>

                        <button
                            className="secondary-btn"
                            onClick={() => navigate('/food-partner/register')}
                        >
                            Become Partner
                        </button>

                    </div>

                </div>

            </section>

            {/* FEATURES */}

            <section className="features-section">

                <div className="feature-card">

                    <div className="feature-icon">🍔</div>

                    <h2>Food Reels</h2>

                    <p>
                        Watch short trending food videos
                        from amazing creators.
                    </p>

                </div>

                <div className="feature-card">

                    <div className="feature-icon">❤️</div>

                    <h2>Save Favorites</h2>

                    <p>
                        Save your favorite meals and restaurants
                        in one place.
                    </p>

                </div>

                <div className="feature-card">

                    <div className="feature-icon">📹</div>

                    <h2>Upload Content</h2>

                    <p>
                        Food partners can upload reels
                        and grow their audience.
                    </p>

                </div>

            </section>

            {/* CTA SECTION */}

            <section className="cta-section">

                <h1>
                    Grow Your Food Business With FoodStream
                </h1>

                <p>
                    Upload food videos, attract customers,
                    and build your online presence.
                </p>

                <button
                    className="cta-btn"
                    onClick={() => navigate('/food-partner/register')}
                >
                    Start Uploading
                </button>

            </section>

            {/* FOOTER */}

            <footer className="footer">

                <h1>FoodStream</h1>

                <p>
                    Discover trending food reels and connect
                    with amazing food creators around you.
                </p>

                <hr />

                <span>
                    © 2026 FoodStream. Taste Every Scroll.
                </span>

            </footer>

        </div>
    )
}

export default Home