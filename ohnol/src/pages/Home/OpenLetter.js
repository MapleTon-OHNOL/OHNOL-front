import React from 'react';
import './OpenLetter.css';
import letter from '../../imgs/home/letter.png';
import springRed from '../../imgs/home/springRed.png';

const OpenLetter = () => {
return (
    <section className="OpenLetter">
        <div className="letterImg"><img src={letter} alt="편지이미지" className="letterImg"/></div>

        <div className="letter-container">
            <div className="letter-username-content"><span className="letter-username">주승우</span></div>

            <div className="letter-content">
                <div className="letter-toMe">
                    <div className="letter-tofrom"><span className="toMe">내가 받은 편지</span></div>
                    <div className="letter-toMe-content">이번 크리스마스 때 뭐해??</div> 
                </div>
                <div className="letter-toMe">
                    <div className="letter-tofrom"><span className="toMe">내가 보낸 편지</span></div>
                    <div className="letter-toMe-content">이번 크리스마스 때 시간 있으면 나랑 영화 보러 갈래??</div> 
                </div>
                <div className="springRed"><img src={springRed} alt="빨간스프링"/></div>
            </div>
        </div>
        
    </section>
    
);
}

export default OpenLetter