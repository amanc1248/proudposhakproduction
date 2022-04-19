import React, { useState } from "react";
import "../Styles/components/Chat.css";
import { useSelector } from "react-redux";
function Chat() {
  const [showHideChat, setShowHideChat] = useState(false);
  const showChatFunction = () => {
    setShowHideChat(!showHideChat);
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const theMessageDiv = (
    <div>
      <div class="thuloDiv">
        <div class="mediumDiv">
          <div>
            <img
              src="https://i.imgur.com/LCuc7WV.png"
              alt="hellogif"
              height="80px"
            />
          </div>
          <div>
            {" "}
            Hi {userInfo && userInfo[0].firstName}. How can we help you?{" "}
          </div>
        </div>
        <div class="seconddiv">
          <div class=" questiondiv">
            <p>Hi, let us know if you have any question</p>
          </div>
          <hr />

          <div className="talk__to__us">
            Talk to us on your favourite Channel
          </div>
          <div className="chatting__boxes">
            <a
              href="https://wa.me/message/5YPVSQXGNXK6C1"
              style={{ textDecoration: "none", color: "black" }}
            >
              <div class=" chatting__box__div">
                <img
                  src="https://i.imgur.com/h3AGzMr.png"
                  alt="whatsapplogo"
                  height="30"
                />
                <div class="seconddiv22">WhatsApp</div>
              </div>
            </a>
            <a
              href="sms:9811095835?body=Hi"
              style={{ textDecoration: "none", color: "black" }}
            >
              {" "}
              <div class="chatting__box__div">
                <img
                  src="https://i.imgur.com/vyS1MTI.png"
                  alt="alpha"
                  height="30"
                />{" "}
                <div class="seconddiv22">Direct Message</div>
              </div>
            </a>

            <a
              href="https://www.facebook.com/proudposhak"
              style={{ textDecoration: "none", color: "black" }}
            >
              <div class="chatting__box__div">
                <img
                  src="https://i.imgur.com/BjvtZlo.png"
                  alt="messenger"
                  height="30"
                />{" "}
                <div class="seconddiv22">Messenger</div>
              </div>
            </a>
            <a
              href="https://www.instagram.com/proudposhak/"
              style={{ textDecoration: "none", color: "black" }}
            >
              <div class="chatting__box__div">
                <img
                  src="https://i.imgur.com/FMlvVgN.png"
                  alt="messenger"
                  height="30"
                />{" "}
                <div class="seconddiv22">Instagram</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {showHideChat ? theMessageDiv : null}
      <div className="open__message__div" onClick={showChatFunction}>
        <img src="https://i.imgur.com/ULMCyaD.png" alt="wave" height="30px" />
        Hi {userInfo && userInfo[0].firstName}...{" "}
        {/* <span className="the__emoji__hand">
          <MdWavingHand></MdWavingHand>
        </span> */}
      </div>
    </div>
  );
}

export default Chat;
