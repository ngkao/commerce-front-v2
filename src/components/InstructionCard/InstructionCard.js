import "../../pages/Instruction/Instruction.scss";

const InstructionCard = ({section,text,text1,text2,text3,dot1,dot2,dot3,dot4,dot5, className}) => {
    return (
        <>
            <p className="instruction__section">{section}</p>
            <div className="instruction__text-ctr">
                <p className="instruction__text">{text}</p>
                <div className="instruction__subtext-ctr">
                    <p className="instruction__subtext">{text1}</p>
                    <p className="instruction__subtext">{text2}</p>
                    <p className="instruction__subtext">{text3}</p>
                    <p className={`instruction__subtext ${className}`}>Note: Use testing card <span className="instruction__subtext--highlighted">4242 4242 4242</span> for Stripe Payment</p>
                </div>
            </div>
            <div className="instruction__dot-ctr">
                <p className={`instruction__dot ${dot1}`}>o</p>
                <p className={`instruction__dot ${dot2}`}>o</p>
                <p className={`instruction__dot ${dot3}`}>o</p>
                <p className={`instruction__dot ${dot4}`}>o</p>
                <p className={`instruction__dot ${dot5}`}>o</p>
            </div>
        </>
    );
};

export default InstructionCard;