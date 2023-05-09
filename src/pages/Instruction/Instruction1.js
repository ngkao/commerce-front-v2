import "./Instruction.scss"
import InstructionCard from "../../components/InstructionCard/InstructionCard";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Instruction = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [cardNumber, setCardNumber] = useState(0);

    useEffect(() => {
        const instructionCtrs = document.querySelectorAll('.instruction__ctr');
        if (location.pathname === "/") {
             instructionCtrs.forEach((instructionCtr) => {
                     instructionCtr.classList.add('instruction__ctr--fade-in');
             });
        } else {
         instructionCtrs.forEach((instructionCtr) => {
             instructionCtr.classList.remove('instruction__ctr--fade-in');
         });
        }
    },[location.pathname]);

    const navCoverBottom = document.querySelector('.nav-cover-bottom');
    const navCoverTop = document.querySelector('.nav-cover-top');
    const navItems = document.querySelectorAll('.nav__item');
    const navItemProducts = Array.from(navItems).find(item => item.textContent.trim() === 'Products');
    const navItemInventory= Array.from(navItems).find(item => item.textContent.trim() === 'Inventory');
    const navItemSales = Array.from(navItems).find(item => item.textContent.trim() === 'Sales History');
    const navItemInsights = Array.from(navItems).find(item => item.textContent.trim() === 'Insights');
    const paysumCoverBottom = document.querySelector('.pay-cover-bottom');
    const paysumCoverTop = document.querySelector('.pay-cover-top');
    const payItemQR = document.querySelector('.checkout__btn');

    const handleNextCard = () => {

        if(cardNumber < 5) {

            // const navCoverBottom = document.querySelector('.nav-cover-bottom');
            // const navCoverTop = document.querySelector('.nav-cover-top');
            // const paysumCoverBottom = document.querySelector('.pay-cover-bottom');
            // const paysumCoverTop = document.querySelector('.pay-cover-top');

            navCoverBottom.classList.add('nav-cover-bottom-on');
            navCoverTop.classList.add('nav-cover-top-on');
            paysumCoverBottom.classList.add('pay-cover-bottom-on');
            paysumCoverTop.classList.add('pay-cover-top-on');

            // if (navCoverBottom && navCoverTop && navItems && navItemProducts && navItemInventory && navItemSales && navItemInsights & paysumCoverBottom && paysumCoverTop && payItemQR) {
                
                if (cardNumber === 0) {
                 
                    if (navItemProducts) {
                        const navItemProducts = Array.from(navItems).find(item => item.textContent.trim() === 'Products');
                        navItemProducts.style.zIndex = '999'
                    } 
                } else {
                    navItemProducts.style.zIndex = '1'
                }

                if (cardNumber === 1) {
                    if (payItemQR) {
                        payItemQR.style.zIndex = '999'
                    } 
                } else {
                    payItemQR.style.zIndex = '1'
                }

                if (cardNumber === 2) {
                    if (navItemInventory) {
                        navItemInventory.style.zIndex = '999'
                    } 
                } else {
                    navItemInventory.style.zIndex = '1'
                }

                if (cardNumber === 3) {
                    if (navItemSales) {
                        navItemSales.style.zIndex = '999'
                    } 
                } else {
                    navItemSales.style.zIndex = '1'
                }

                if (cardNumber === 4) {
                    if (navItemInsights) {
                        navItemInsights.style.zIndex = '999'
                    } 
                } else {
                    navItemInsights.style.zIndex = '1'
                }
            // }

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
            navItemInsights.style.zIndex = '1';
            navCoverBottom.classList.remove('nav-cover-bottom-on');
            navCoverTop.classList.remove('nav-cover-top-on');
            paysumCoverBottom.classList.remove('pay-cover-bottom-on');
            paysumCoverTop.classList.remove('pay-cover-top-on');
            navigate("/products")

        } else {
            let count = cardNumber;
            let newCount = count+1;
            setCardNumber(newCount);
        }
    }

    const handleSkip = () => {
        navItemInsights.style.zIndex = '1';
        navCoverBottom.classList.remove('nav-cover-bottom-on');
        navCoverTop.classList.remove('nav-cover-top-on');
        paysumCoverBottom.classList.remove('pay-cover-bottom-on');
        paysumCoverTop.classList.remove('pay-cover-top-on');
        navigate("/products")
    }

    return (
        <section className="instruction">
            <div className={`instruction__ctr`}>
                <div className="instruction__subctr">
                    {cardNumber === 0 ? <InstructionCard
                        section="Welcome on Board"
                        text="Snack POS is a commerce POS solution that caters to small retail owners or pop-up shops with the following benefits:"
                        text1="1) Checkout with QR Codes and Stripe Payments"
                        text2="2) Simple Inventory management"
                        text3="3) Business Performance Insights"
                        className="instruction__subtext--hide"
                    /> : null}
                    {cardNumber === 1 ? <InstructionCard
                        section="Products"
                        text="A merchant selects products that a customer would like to buy."
                        dot1="instruction__dot--selected"
                        className="instruction__subtext--hide"
                    /> : null}
                    {cardNumber === 2 ? <InstructionCard
                        section="Payment"
                        text2="A merchant generates a QR code for a customer payment via Stripe."
                        text3="A customer can use a phone to scan (or click on the QR code)."
                        dot2="instruction__dot--selected"
                    /> : null}
                    {cardNumber === 3 ? <InstructionCard
                        section="Inventory"
                        text="A merchant can view the units sold and the units available in stock."
                        dot3="instruction__dot--selected"
                        className="instruction__subtext--hide"
                    /> : null}
                    {cardNumber === 4 ? <InstructionCard
                        section="Sales"
                        text="A merchant can view detailed sales transaction records."
                        dot4="instruction__dot--selected"
                        className="instruction__subtext--hide"
                    /> : null}
                    {cardNumber === 5 ? <InstructionCard
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