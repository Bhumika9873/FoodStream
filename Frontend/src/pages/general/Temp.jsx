import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/home.css'

const Landing = () => {

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
                            onClick={() => navigate('/feed')}
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

export default Temp