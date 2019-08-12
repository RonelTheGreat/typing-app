import React from 'react'

const Links = () => {
    return (
        <div className="links">
            <div className="fb">
                <a href="https://facebook.com" target="blank">
                    <i className="fab fa-facebook-f" />
                </a>
                <span className="tooltip">
                    https://facebook.com/rcobthegreat
                </span>
            </div>
            <div className="gmail">
                <a href="https://gmail.com">
                    <i className="fab fa-google" />
                </a>
                <span className="tooltip">ronelcarlo.berino@gmail.com</span>
            </div>
            <div className="github">
                <a href="https://github.com/RonelTheGreat" target="blank">
                    <i className="fab fa-github fa-2x" />
                </a>
                <span className="tooltip">
                    https://github.com/RonelTheGreat
                </span>
            </div>
        </div>
    )
}

export default Links
