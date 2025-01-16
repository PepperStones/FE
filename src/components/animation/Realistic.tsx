import { CreateTypes } from "canvas-confetti";
import React, { Component } from "react";
import ReactCanvasConfetti from "../../utils/ReactCanvasConfetti.tsx";

interface RealisticProps {
    onStart: boolean; // onStart prop 정의
    onComplete?: () => void;  // 애니메이션 종료 시 호출할 콜백
}

export default class Realistic extends Component<RealisticProps> {
    private isAnimationEnabled: boolean;
    private animationInstance: CreateTypes | null = null;

    constructor(props: RealisticProps) {
        super(props);
        this.isAnimationEnabled = false;
        this.fire = this.fire.bind(this);
    }

    makeShot(particleRatio: number, opts: object) {
        this.animationInstance &&
            this.animationInstance({
                ...opts,
                origin: { y: 0.8 },
                particleCount: Math.floor(200 * particleRatio),
            });
    }

    fire() {
        this.makeShot(0.25, {
            spread: 25,
            startVelocity: 55,
        });

        // 애니메이션이 끝난 후 콜백 호출
        setTimeout(() => {
            if (this.props.onComplete) {
                this.props.onComplete();
            }
            this.isAnimationEnabled = false; // 상태 초기화
        }, 1000); // 애니메이션 지속 시간 (1초)
    }

    handlerFire = () => {
        if (!this.isAnimationEnabled) {
            this.isAnimationEnabled = true;
        }
        requestAnimationFrame(this.fire);
        this.fire();
    };

    getInstance = (instance: CreateTypes | null) => {
        this.animationInstance = instance;
    };

    // props 변경 감지
    componentDidUpdate(prevProps: RealisticProps) {
        if (!prevProps.onStart && this.props.onStart) {
            // onStart가 false에서 true로 변경되었을 때 실행
            this.handlerFire();
        }
    }

    render() {

        return (
            <>
                <div style={{ height: "100vh", width: '100wh' }} onClick={this.handlerFire}></div>
                <ReactCanvasConfetti
                    refConfetti={this.getInstance}
                    className="canvas"
                />
            </>
        );
    }
}
