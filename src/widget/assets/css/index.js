export function exportCss() {
  return `#safleKeylessWidget {
    font-family: 'Poppins', sans-serif !important;
    font-weight: 300;
  }
  #safleKeylessWidget h1,
  #safleKeylessWidget h2,
  #safleKeylessWidget h3,
  #safleKeylessWidget h4,
  #safleKeylessWidget h5,
  #safleKeylessWidget h6 {
    margin: 0px;
    color: #2e2e2f;
    font-weight: 400;
  }
  #safleKeylessWidget p {
    margin: 0px;
  }
  #safleKeylessWidget input {
    outline: 0;
  }
  .widget-modal-content {
    position: fixed;
    left: 50%;
    top: 50%;
    background-color: #fff;
    z-index: 9;
    box-shadow: 0px 2px 8px #00000014;
    border: 1px solid #d7e5fc;
    border-radius: 7px;
    padding: 30px 40px;
    width: 478px;
    display: none;
    transform: translate(-50%,-50%);
  }
  .widget-modal-content.active {
    display: block;
  }
  .widget-modal-header {
    text-align: center;
    padding-bottom: 28px;
  }
  .widget-modal-header h1 {
    font-size: 2.5rem;
    line-height: 1.2;
  }
  .widget-modal-footer {
    text-align: center;
  }
  .widget-modal-footer p {
    color: #707070;
    font-size: 10px;
    line-height: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .widget-modal-footer p a {
    color: #1f4788;
    margin-left: 5px;
    height: 25px;
    display: inline-block;
    margin-top:-10px;
  }
  .widget-modal-footer p a svg {
    width: 60px;
  }
  .widget-modal-button {
    text-align: center;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .widget-modal-button button {
    /*color: #fff;
    background-image: linear-gradient(to right, #12bde2, #0669f8);
    border-radius: 23px;
    padding: 7px 50px;
    font-size: 1rem;
    line-height: 1.5;
    outline: 0;
    width: 100%;
    cursor: pointer;
    border: none;*/
    
    outline: 0;
    cursor: pointer;
    border-radius: 8px;
    padding: 1rem 3rem;
    text-align: center;
    color: #fff;
    font-size: 15px;
    font-weight: 500;
    display: block;
    margin-bottom: 2.5rem;
    min-width: 15rem;
    background-color: #0669F8;
    border: 0px;
    transition: all 250ms ease-in-out;
    -webkit-transition: all 250ms ease-in-out;
    -moz-transition: all 250ms ease-in-out;
    -o-transition: all 250ms ease-in-out;
  }
  .widget-modal-button button:hover {
    color: #fff;
    background-color: #12BDE2;
    opacity: 0.6;
  }
  .widget-modal-button button#login-button,
  #transaction-confirm-button,
  #sign-tranx-button,
  #sign-and-send-tranx-button,
  .btn-centered {
    margin-left: auto;
    margin-right: auto;
  }
  .widget-modal-input {
    margin-bottom: 1rem;
  }
  .widget-modal-input label {
    color: #2e2e2f;
    font-size: 14px;
    margin-bottom: 0.5rem;
    display: block;
  }
  .widget-modal-input input {
    /*border-radius: 20px;
    width: 95%;
    padding: 0.44rem 0.75rem;
    font-size: 13px;
    line-height: 1.5;
    color: #6f6f6f;
    background-color: #fff;
    border: 1px solid #d1d3e2;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;*/

    font-size: 14px;
    font-weight: 500;
    color: #000000;
    opacity: 1;
    line-height: 1.2;
    padding: 1.3rem 1rem;
    box-sizing: border-box;
    z-index: 35;
    max-width: 100%;
    width: 100%;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #e4e5e6;
    outline: none;
  }
  
  .widget-modal-link {
    text-align: center;
    margin-bottom: 1rem;
  }
  .widget-modal-link p {
    font-size: 16px;
    line-height: 25px;
    color: #707070;
  }
  .widget-modal-link p a {
    color: #4e73df;
    cursor: pointer;
  }
  
  .widget-modal-flex {
    display: flex;
    justify-content: space-between;
  }
  .widget-modal-checkbox label {
    cursor: pointer;
    margin-bottom: 0px;
  }
  .widget-modal-checkbox input {
    width: initial;
    cursor: pointer;
  }
  .widget-modal-forgot-link span {
    font-size: 14px;
    color: #4e73df;
    cursor: pointer;
  }
  
  .widget-modal-status {
    text-align: center;
    margin-bottom: 1rem;
  }
  .widget-modal-status h1 {
    font-size: 28px;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }
  .widget-modal-status p {
    color: #707070;
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
  }
  
  .rsps-card-wrap {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0rem;
  }
  .rsps-card-wrap .rsps-card {
    text-align: center;
  }
  .rsps-card-input-element {
    display: none;
  }
  
  .rsps-card-input {
    padding: 00px;
  }
  
  .rsps-card-input:hover {
    cursor: pointer;
  }
  
  .rsps-card-input-element:checked + .rsps-card-input .rsps-icon {
    border: 1px solid #1f4788;
  }
  
  .rsps-icon {
    border-radius: 4px;
    background-color: #f5f6fa;
    padding: 15px 20px;
    text-align: center;
    border: 1px solid #f5f6fa;
  }
  .rsps-text label {
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    color: #707070;
  }
  .widget-modal-motes {
    margin-bottom: 1rem;
  }
  .widget-modal-motes p label {
    font-size: 12px;
    line-height: 25px;
    font-weight: 900;
    display: inline-block;
    width: 22%;
  }
  .widget-modal-motes p span {
    font-size: 12px;
    line-height: 25px;
    color: #707070;
  }
  .widget-modal-motes .ether-scan {
    line-height: 25px;
    margin: 15px 0px;
    text-align: center;
  }
  .widget-seed-input-wrap {
    margin-top: 1rem;
  }
  .widget-seed-input-laebl label {
    color: #2e2e2f;
    font-size: 14px;
    margin-bottom: 0.5rem;
    display: block;
    padding-bottom: 1rem;
  }
  .widget-seed-input-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .widget-seed-input {
    width: 64px;
    display: flex;
    flex-direction: column;
    padding: 0px 3px;
    margin-bottom: 20px;
  }
  .widget-seed-input label {
    height: 30px;
    width: 30px;
    border-radius: 100%;
    background-color: #eaf2ff;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    color: #2e2e2f;
    font-size: 14px;
    margin-bottom: 0.5rem;
  }
  .widget-seed-input input {
    padding: 2px 0px;
    font-size: 13px;
    line-height: 1.5;
    color: #a0a0a0;
    background-color: #fff;
    border: 1px solid #d1d3e2;
    border-radius: 20px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    text-align: center;
  }
  .widget-modal-input input.lg {
    padding: 1.54rem 0.75rem;
  }
  .key-store-uploading-message {
    padding: 10px;
    border: 1px solid #eaf2ff;
    border-radius: 10px;
    display: none;
  }
  .key-store-uploading-message span {
    color: #359857;
  }
  .widget-upload-key-store-container {
    padding: 25px;
    text-align: center;
    border: 2px dashed #c2d7f8;
    margin-bottom: 25px;
  }
  .widget-upload-key-store-container p {
    padding-top: 15px;
  }
  .widget-upload-key-store-container label {
    color: #3974d4;
    text-decoration: underline;
    cursor: pointer;
  }
  #key-store-file {
    visibility: hidden;
  }
  .forgot-password-rsps-card span {
    vertical-align: -webkit-baseline-middle;
  }
  #error-message {
    font-size: 11px;
    color: red;
  }
  #sign-success-message {
    font-size: 11px;
    color: green;
  }
  .ether-scan-logo {
    width: 30%;
  }
  .close-button {
    position: absolute;
    top: -13px;
    right: -10px;
    z-index: 99999 !important;
  }
  .close-button button {
    border: 0px;
    border-radius: 100%;
    background: #000;
    padding: 3px 9px;
    cursor: pointer;
  }
  #keylessWidgetModalLoader {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    z-index: 9;
    top: 0;
  }
  #safleKeylessWidget {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
  }
  #back-arrow-icon {
    float: left;
    cursor: pointer;
  }
  
  .transaction-message {
    padding-bottom: 15px;
    text-align: center;
  }
  
  /* Loader CSS */
  #modal-loader {
    height: 490px;
  }
  
  #loader {
    display: none;
  }
  .safle-loader {
    background-color: #a09e9ee3;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 99999 !important;
    top: 0;
    left: 0;
  }
  
  .loader-container {
    position: relative;
    z-index: 999;
    width: 12em;
    overflow: show;
    margin: auto;
    top: 50%;
    left: 0;
    bottom: 0;
    right: 0;
    transform: translateY(-50%);
    text-align: center;
  }
  
  .loader-container svg {
    width: 80%;
    transform: scale(1);
    animation: beat 1.4s 0s linear infinite;
  }
  @keyframes beat {
    0% {
      transform: scale(1)
    }
    50% {
      transform: scale(1.15)
    }
    100% {
      transform: scale(1)
    }
  }

  
  @media only screen and (max-width: 767px) {
    #safleKeylessWidget {
      left: 0;
      
    }
    .widget-modal-content {
      max-width: 100%;
      margin: 15px;
      bottom: initial;
      right: 0;
      left: 0;
      padding: 15px;
      width: auto;
      transform: translate( 0, -50% );
    }
    .widget-modal-header h1 {
      font-size: 18px;
    }
    .widget-modal-link p {
      font-size: 14px;
    }
  }
  
  @media only screen and (max-width: 320px) {
    .widget-modal-motes p span {
      font-size: 11px;
    }
    .widget-modal-motes p label {
      width: 30%;
    }
  }`;
}
