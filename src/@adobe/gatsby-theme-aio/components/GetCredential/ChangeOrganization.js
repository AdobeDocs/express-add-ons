import React from 'react';
import { css } from "@emotion/react";

const ChangeOrganization = ({ onClose, onSave }) => {
  return (
    <div className="spectrum-Modal-wrapper spectrum-CSSExample-dialog"
      css={css`
          width: 100%;
          height: 100%;
          background-color: gray;
          visibility: visible;
        `}
    >
      <div className="spectrum-Modal is-open" data-testid="modal">
        <section className="spectrum-Dialog spectrum-Dialog--medium spectrum-Dialog--confirmation" role="alertdialog" tabIndex="-1" aria-modal="true"
          css={css`
              width: calc(var(--spectrum-dialog-confirm-large-width) - 60px);
            `}
        >
          <div className="spectrum-Dialog-grid">
            <h1 className="spectrum-Dialog-heading spectrum-Dialog-heading--noHeader">Change organization</h1>
            <hr className="spectrum-Divider spectrum-Divider--sizeM spectrum-Divider--horizontal spectrum-Dialog-divider" />
            <section className="spectrum-Dialog-content">
              <div
                css={css`
                  display:flex;
                  flex-direction:column;
                  gap:20px;
                `}
              >
                <div>
                  An organization is the entity that functions like a log-in company that spans all Adobe products and applications. Most often, an organization is your company name.However, a company can have many organizations. Change the organization here.
                </div>
                <div
                  css={css`
                  display : flex;
                  flex-direction:column;
                  `}
                >
                  <div className="spectrum-Textfield spectrum-Textfield--sizeM">
                    <label for="textfield-m" className="spectrum-FieldLabel spectrum-FieldLabel--sizeM"
                      css={css`
                        color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-600))
                      `}>Organization</label>
                  </div>
                  <select
                    css={css`
                    font-weight: 500;
                    font-family: 'adobe-clean';
                    padding: 5px;
                    border-radius: 3px;
                    border: 1px solid #D0D0D0 !important;
                  `}
                    value=""
                  >
                    <option value="">
                      Org Name Inc.
                    </option>
                  </select>
                </div>
                <div>
                  Can't find your organization? <a href=""
                    css={css`
                      color:rgb(0, 84, 182);
                      &:hover {
                        color: rgb(2, 101, 220);
                      }`
                    }
                  >Learn more about organizations.</a>
                </div>
              </div>
            </section>
            <div className="spectrum-ButtonGroup spectrum-Dialog-buttonGroup spectrum-Dialog-buttonGroup--noFooter"
              css={css`
                  gap: 20px;
                `}
            >
              <button className="spectrum-Button spectrum-Button--sizeM spectrum-Button--outline spectrum-Button--secondary spectrum-ButtonGroup-item" type="button" onClick={onClose}>
                <span className="spectrum-Button-label">Cancel</span>
              </button>
              <button className="spectrum-Button spectrum-Button--sizeM spectrum-Button--fill spectrum-Button--accent spectrum-ButtonGroup-item" type="button" onClick={() => { onSave(); onClose(); }}>
                <span className="spectrum-Button-label">Save</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export { ChangeOrganization }