import {
  inbloxWidgetIcon,
  uploadFileIcon,
  inbloxMe
} from '../../assets/images';

import { loader } from '../loader';

export function resetPasswordUploadKeyStore() {
  return `
  <div class="widget-modal-content active" id="reset-password-upload-key-store">
    ${loader()}
    <div class="widget-modal-header">
      ${inbloxWidgetIcon}
      <h1>
        Reset Password
      </h1>
    </div>
    <div class="widget-modal-motes">
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>
    </div>
    <div class="widget-upload-key-store-wrap">
      <div class="widget-upload-key-store-container">
        <span>
          ${uploadFileIcon}
        </span>
        <p>Drag & Drop keystore file here to upload</p>
        <label for="key-store-file">Browse File</label>
        <input id="key-store-file" name="key-store-file" type="file">
      </div>
      <div class="key-store-uploading-message" id="show-uploading-message">
        <span>Uploading...</span>
      </div>
      <div class="key-store-uploading-message" id="show-uploaded-message">
        <span>Uploaded</span>
      </div>
    </div>
    <div class="widget-modal-footer">
      <p>
        powered by
        <a href="https://inblox.me/">
          ${inbloxMe}
        </a>
      </p>
    </div>
  </div>`;
}
