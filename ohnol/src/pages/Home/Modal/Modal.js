import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import "./Modal.css";


function Modal({ classNameName, onClose, maskClosable, closable, visible }) {
    const onMaskClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose(e)
        }
    }

    // 이전방문 날짜
    const VISITED_BEFORE_DATE = localStorage.getItem('VisitCookie')
    // 현재 날짜
    const VISITED_NOW_DATE = Math.floor(new Date().getDate())

    // console.log(VISITED_BEFORE_DATE)
    // console.log(VISITED_NOW_DATE)
    // localStorage.removeItem('VisitCookie')

    useEffect(() => {
        // 팝업 오늘 하루닫기 체크
        if (VISITED_BEFORE_DATE !== null) {
            // 날짜가 같을경우 노출
            if (VISITED_BEFORE_DATE === VISITED_NOW_DATE) {
                localStorage.removeItem('VisitCookie')
                onClose(true)
            }
            // 날짜가 다를경우 비노출
            if (VISITED_BEFORE_DATE !== VISITED_NOW_DATE) {
                onClose(false)
            }
        }
    }, [VISITED_BEFORE_DATE])

    // 하루동안 팝업 닫기
    const Dayclose = (e) => {
        if (onClose) {
            onClose(e)

            const expiry = new Date()
            // +1일 계산
            const expiryDate = expiry.getDate() + 1
            // 로컬스토리지 저장
            localStorage.setItem('VisitCookie', expiryDate)
        }
    }

    const close = (e) => {
        if (onClose) {
            onClose(e)
        }
    }

    return (
        <div className="modal">
            <div id="description" className="modal-body">
                <div className="close" onClick={close}>X</div>
                <div className="modal-content">
                보고 싶은 사람에게 용기 내서 편지를 작성해 보세요. <br/>
                서로에게 편지를 썼다면 <br/>
                크리스마스이브에 당신의 마음이 전달됩니다!<br/>
                혼자만의 편지라면 전달되지 않고 사라져요 😥 <br/>
                </div>
                <div className="neverShow" onClick={Dayclose}>이 창 다시 보지 않기</div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    visible: PropTypes.bool,
}

export default React.memo(Modal)