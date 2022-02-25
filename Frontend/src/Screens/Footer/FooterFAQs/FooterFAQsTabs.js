import React, { Component } from "react";
import PropTypes from "prop-types";
import "./FooterFAQsTabs.css";

export class FooterFAQsTab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  //OnClick function
  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };
  render() {
    const {
      onClick,
      props: { activeTab, label },
    } = this;
    let className = "footer-tab-list-item";
    if (activeTab === label) {
      className += " footer-tab-list-active";
    }
    return (
      <li className={className} onClick={onClick}>
        {label}
      </li>
    );
  }
}

export class FooterFAQsTabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.children[0].props.label,
    };
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      onClickTabItem,
      props: { children },
      state: { activeTab },
    } = this;
    return (
      <div className="tabs">
        <ul className="footer-tab-list">
          {children.map((child) => {
            const { label } = child.props;
            return (
              <FooterFAQsTab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              ></FooterFAQsTab>
            );
          })}
        </ul>
        <div className="footer-tab-content">
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}
