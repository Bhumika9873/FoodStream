import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/reels.css'

const Landing = () => {
    const navigate = useNavigate()

    return (
        <div className="landing-container">
            <div className="landing-box">
                <h1 className="landing-title">Pyara Za</h1>

                <button
                    className="landing-btn"
                    onClick={() => navigate('/login')}
                >
                    User Login
                </button>

                <button
                    className="landing-btn outline"
                    onClick={() => navigate('/food-partner/login')}
                >
                    Food Partner Login
                </button>
            </div>
        </div>
    )
}

export default Landing
