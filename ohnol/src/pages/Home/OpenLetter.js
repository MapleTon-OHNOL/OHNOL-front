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
                    <div className="letter-tofrom"><span className="toMe">To. Me</span></div>
                    <div className="letter-toMe-content">선거에 있어서 최고득표자가 2인 이상인 때에는 국회의 재적의원 과반수가 출석한 공개회의에서 다수표를 얻은 자를 당선자로 한다. 이 헌법은 1988년 2월 25일부터 시행한다. 다만, 이 헌법을 시행하기 위하여 필요한 법률의 제정·개정과 이 헌법에 의한 대통령 및 국회의원의 선거 기타 이 헌법시행에 관한 준비는 이 헌법시행 전에 할 수 있다.</div> 
                </div>
                <div className="letter-toMe">
                    <div className="letter-tofrom"><span className="toMe">From. Me</span></div>
                    <div className="letter-toMe-content">선거에 있어서 최고득표자가 2인 이상인 때에는 국회의 재적의원 과반수가 출석한 공개회의에서 다수표를 얻은 자를 당선자로 한다. 이 헌법은 1988년 2월 25일부터 시행한다. 다만, 이 헌법을 시행하기 위하여 필요한 법률의 제정·개정과 이 헌법에 의한 대통령 및 국회의원의 선거 기타 이 헌법시행에 관한 준비는 이 헌법시행 전에 할 수 있다.</div> 
                </div>
                <div className="springRed"><img src={springRed} alt="빨간스프링"/></div>
            </div>
        </div>
        
    </section>
    
);
}

export default OpenLetter