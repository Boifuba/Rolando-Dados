import "./SharedButtons.css";
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

const ShareButtons = ({ url, title }) => (
  <div className="share-buttons">
    <FacebookShareButton
      className="share-button"
      url={url}
      quote={title}
      aria-label="Compartilhar no Facebook"
    >
      <FacebookIcon size={32} round />
    </FacebookShareButton>

    <TwitterShareButton
      className="share-button"
      url={url}
      title={title}
      aria-label="Compartilhar no Twitter"
    >
      <TwitterIcon size={32} round />
    </TwitterShareButton>

    <TelegramShareButton
      className="share-button"
      url={url}
      title={title}
      aria-label="Compartilhar no Telegram"
    >
      <TelegramIcon size={32} round />
    </TelegramShareButton>

    <WhatsappShareButton
      className="share-button"
      url={url}
      title={title}
      aria-label="Compartilhar no WhatsApp"
    >
      <WhatsappIcon size={32} round />
    </WhatsappShareButton>
  </div>
);

export default ShareButtons;
