import "./SharedButonsHorizontal.css";
import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const ShareButtonsHorizontal = ({ url, title }) => (
  <div className="horizontal">
    <FacebookShareButton className="horizontal" url={url} quote={title}>
      <FacebookIcon size={50} round />
    </FacebookShareButton>

    <TwitterShareButton className="horizontal" url={url} title={title}>
      <TwitterIcon size={50} round />
    </TwitterShareButton>

    <TelegramShareButton className="horizontal" url={url} title={title}>
      <TelegramIcon size={50} round />
    </TelegramShareButton>

    <WhatsappShareButton className="horizontal" url={url} title={title}>
      <WhatsappIcon size={50} round />
    </WhatsappShareButton>
  </div>
);

export default ShareButtonsHorizontal;
