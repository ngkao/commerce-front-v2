import "./Instruction.scss"
import InstructionCard from "../../components/InstructionCard/InstructionCard";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Instruction = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [cardNumber, setCardNumber] = useState(0);
    useEffect(() => {
        const element = document.querySelector('.instruction__ctr');
        element.classList.add('instruction__ctr--fade-in');

    },[location]);

    const handleNextCard = () => {

        if(cardNumber < 5) {
            const navContainers = document.querySelectorAll('.nav');
            navContainers.forEach((navContainer) => {
            navContainer.style.opacity = '0.5';
            });

            const paysumContainers = document.querySelectorAll('.paysum');
            paysumContainers.forEach((paysumContainer) => {
                paysumContainer.style.opacity = '0.5';
                });

        } else {
            const navs = document.querySelectorAll('.nav');
            navs.forEach(nav => {
            nav.style.opacity = '1';
            });
            const paysumContainers = document.querySelectorAll('.paysum');
            paysumContainers.forEach((paysumContainer) => {
                paysumContainer.style.opacity = '1';
                });
        }

        if (cardNumber > 4) {
            navigate("/products")
        } else {
            let count = cardNumber;
            let newCount = count+1;
            setCardNumber(newCount);
        }
    }

    const handleSkip = () => {
        const navs = document.querySelectorAll('.nav');
        navs.forEach(nav => {
        nav.style.opacity = '1';
        });
        const paysumContainers = document.querySelectorAll('.paysum');
        paysumContainers.forEach((paysumContainer) => {
            paysumContainer.style.opacity = '1';
            });
        navigate("/products")
    }

    return (
        <section className="instruction">
            {/* <p className="instruction__title">Instruction</p> */}
            <div className={`instruction__ctr`}>
                <div className="instruction__subctr">
                    {cardNumber == 0 ? <InstructionCard
                        section="Welcome on Board"
                        text="Snack POS is a commerce POS solution that caters to small brick and mortar retail owners or pop-up shops the following benefits:"
                        text1="1) Checkout Payment with Stripe and QR Codes"
                        text2="2) Simple Inventory management"
                        text3="3) Business Performance Insights"
                        className="instruction__subtext--hide"
                    /> : null}
                    {cardNumber == 1 ? <InstructionCard
                        section="Products"
                        text="A merchant selects items that a customer would like to purchase."
                        dot1="instruction__dot--selected"
                        className="instruction__subtext--hide"
                    /> : null}
                    {cardNumber == 2 ? <InstructionCard
                        section="Generate QR Code"
                        text="Once a customer is ready to pay, a merchant generates a QR code for a digital payment via Stripe. A customer can use a phone to scan or click on the QR code."
                        dot2="instruction__dot--selected"
                    /> : null}
                    {cardNumber == 3 ? <InstructionCard
                        section="Inventory"
                        text="A merchant can view the units sold and the units available in stock."
                        dot3="instruction__dot--selected"
                        className="instruction__subtext--hide"
                    /> : null}
                    {cardNumber == 4 ? <InstructionCard
                        section="Sales"
                        text="A merchant can view detailed sales transaction records."
                        dot4="instruction__dot--selected"
                        className="instruction__subtext--hide"
                    /> : null}
                    {cardNumber == 5 ? <InstructionCard
                        section="Insights"
                        text="A merchant can view business metrics for today and this month."
                        dot5="instruction__dot--selected"
                        className="instruction__subtext--hide"
                    /> : null}
                    <div className="instruction__btn-ctr">
                        <p className="instruction__skip" onClick={handleSkip}>SKIP</p>
                        <p className="instruction__next" onClick={handleNextCard}>{cardNumber === 0 ? "LEARN" : cardNumber === 5 ? "GET STARTED" : "NEXT"}</p>
                    </div>
                </div>
            </div>


        </section>
    );
};

export default Instruction;