import "../../pages/Instruction/Instruction.scss";

const InstructionCard = ({section,text,text1,dot1,dot2,dot3,dot4,dot5}) => {
    return (
        <>
            <p className="instruction__section">{section}</p>
            <div className="instruction__text-ctr">
                <p className="instruction__text">{text}</p>
                <p className="instruction__text">{text1}</p>
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