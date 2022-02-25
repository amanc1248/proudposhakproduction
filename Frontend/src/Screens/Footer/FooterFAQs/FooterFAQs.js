import React, { useState } from "react";
import "./FooterFAQ.css";
import { FooterFAQsTabs } from "./FooterFAQsTabs";
import {
  ordersAndPaymentData,
  shippingAndDelivery,
} from "../../../data/FooterData/FooterDataFaqs.js";
function FooterFAQs() {
  return (
    <div className="footer__faqs">
      <div className="theBackgroundImage">
        <div className="faq__title">FREQUENTLY ASKED QUESTIONS</div>
      </div>
      <div>
        <FooterFAQsTabs>
          <div label="ORDERS & PAYMENTS">
            <FAQContent
              title={"ORDERS & PAYMENTS"}
              thedata={ordersAndPaymentData}
            ></FAQContent>
          </div>
          <div label="SHIPPING & DELIVERY">
            <FAQContent
              title={"SHIPPING & DELIVERY"}
              thedata={shippingAndDelivery}
            ></FAQContent>
          </div>
          {/* <div label="RETURNS & EXCHANGE">
            <FAQContent
              title={"RETURNS & EXCHANGE"}
              thedata={returnsAndExchange}
            ></FAQContent>
          </div> */}
        </FooterFAQsTabs>
      </div>
    </div>
  );
}

export default FooterFAQs;
function FAQContent({ title, thedata }) {
  // Expand all state👇
  const [contentToogle, setContentToogle] = useState(false);
  const contentToogling = () => {
    setContentToogle(!contentToogle);
  };

  function QuestionAnswer({ question, answer }) {
    const [answerToogle, setanswerToogle] = useState(true);
    const answerToggling = () => {
      setanswerToogle(!answerToogle);
    };
    return (
      <div className="question__answer">
        <div className="question__expand">
          <div className="question">{question}</div>
          <div className="question__answer__toogle" onClick={answerToggling}>
            {answerToogle ? "hide -" : "show +"}{" "}
          </div>
        </div>
        {answerToogle ? <div className="answer">{answer}</div> : null}
      </div>
    );
  }
  const questionsAnswers = thedata.map((obj) => {
    return (
      <QuestionAnswer
        question={obj.question}
        answer={obj.answer}
      ></QuestionAnswer>
    );
  });
  return (
    <div className="faq__content">
      {/* Title Part👇 */}
      <div className="faq__content__title__expand">
        <div className="faq__content__title">{title}</div>
      </div>
      {/* Content part 👇 */}
      {questionsAnswers}
    </div>
  );
}
