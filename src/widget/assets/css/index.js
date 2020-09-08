export function exportCss() {
  return `body {
    font-family: 'Poppins', sans-serif !important;
    font-weight: 300;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0px;
    color: #2e2e2f;
    font-weight: 400;
  }
  p {
    margin: 0px;
  }
  input {
    outline: 0;
  }
  .widget-modal-content {
    position: fixed;
    bottom: 20%;
    right: 35%;
    background-color: #fff;
    z-index: 9;
    box-shadow: 0px 2px 8px #00000014;
    border: 1px solid #d7e5fc;
    border-radius: 7px;
    padding: 30px 40px;
    width: 478px;
    display: none;
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
    font-size: 16px;
    line-height: 25px;
  }
  .widget-modal-footer p a {
    color: #1f4788;
  }
  .widget-modal-button {
    text-align: center;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .widget-modal-button button {
    color: #fff;
    background-image: linear-gradient(to right, #12bde2, #0669f8);
    border-radius: 23px;
    padding: 7px 50px;
    font-size: 1rem;
    line-height: 1.5;
    outline: 0;
    width: 100%;
    cursor: pointer;
    border: none;
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
    border-radius: 20px;
    width: 95%;
    padding: 0.44rem 0.75rem;
    font-size: 13px;
    line-height: 1.5;
    color: #a0a0a0;
    background-color: #fff;
    border: 1px solid #d1d3e2;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
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
    margin: 40px;
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
    visibility:hidden;
  }
  .forgot-password-rsps-card span {
    vertical-align: -webkit-baseline-middle;
  }
  #error-message {
    font-size: 11px;
    color: red;
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
  #inbloxKeylessWidget {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    z-index: 9;
    top: 0;
  }
  #back-arrow-icon {
    float: left;
  }
  .transaction-message {
    padding-bottom: 15px;
    text-align: center;
  }

  /* Loader CSS */
  #loader {
    display: none;
  }
  .inblox-loader {
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
  }

  .progress-message {
    padding-top: 15px;
    font-weight: 600;
    color: #ffffff;
  }

  .bar {
    width: 10px;
    height: 2px;
    margin-right: 4px;
    display: inline-block;
    background-color: #1e4788;
  }

  .progress {
    width: 140px;
    height: 5px;
    display: block;
    background-color: #1e4788;
    position: relative;
    top: 10px;
    animation-name: Progress;
    animation-duration: 800ms;
    animation-timing-function: ease-in-out;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: forwards;
  }

  @keyframes Progress {
    0% {
      width: 0px;
    }
    100% {
      width: 170px;
    }
  }
  .bar1 {
    animation-name: Bar;
    animation-duration: 800ms;
    animation-timing-function: cubic- bezier(0.54, -0.01, 0.42, 0.99);
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    animation-fill-mode: both;
    animation-delay: 0.03s;
  }

  .bar2 {
    animation-name: Bar;
    animation-duration: 800ms;
    animation-timing-function: cubic- bezier(0.54, -0.01, 0.42, 0.99);
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    animation-fill-mode: both;
    animation-delay: 0.06s;
  }

  .bar3 {
    animation-name: Bar;
    animation-duration: 800ms;
    animation-timing-function: cubic- bezier(0.54, -0.01, 0.42, 0.99);
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    animation-fill-mode: both;
    animation-delay: 0.09s;
  }

  .bar4 {
    animation-name: Bar;
    animation-duration: 800ms;
    animation-timing-function: cubic- bezier(0.54, -0.01, 0.42, 0.99);
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    animation-fill-mode: both;
    animation-delay: 0.12s;
  }

  .bar5 {
    animation-name: Bar;
    animation-duration: 800ms;
    animation-timing-function: cubic- bezier(0.54, -0.01, 0.42, 0.99);
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    animation-fill-mode: both;
    animation-delay: 0.15s;
  }

  .bar6 {
    animation-name: Bar;
    animation-duration: 800ms;
    animation-timing-function: cubic- bezier(0.54, -0.01, 0.42, 0.99);
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    animation-fill-mode: both;
    animation-delay: 0.18s;
  }

  .bar7 {
    animation-name: Bar;
    animation-duration: 800ms;
    animation-timing-function: cubic- bezier(0.54, -0.01, 0.42, 0.99);
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    animation-fill-mode: both;
    animation-delay: 0.21s;
  }

  .bar8 {
    animation-name: Bar;
    animation-duration: 800ms;
    animation-timing-function: cubic- bezier(0.54, -0.01, 0.42, 0.99);
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    animation-fill-mode: both;
    animation-delay: 0.24s;
  }

  .bar9 {
    animation-name: Bar;
    animation-duration: 800ms;
    animation-timing-function: cubic- bezier(0.54, -0.01, 0.42, 0.99);
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    animation-fill-mode: both;
    animation-delay: 0.27s;
  }

  .bar10 {
    animation-name: Bar;
    animation-duration: 800ms;
    animation-timing-function: cubic- bezier(0.54, -0.01, 0.42, 0.99);
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    animation-fill-mode: both;
    animation-delay: 0.3s;
  }

  @keyframes Bar {
    0% {
      background-color: #1e4788;
      transform: scaleY(0.5);
    }
    100% {
      transform: scaleY(10);
    }
  }
  `;
}
