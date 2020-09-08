import { inbloxWidgetIcon, inbloxMe } from '../../assets/images';

import { loader } from '../loader';

export function resetPasswordSeed() {
  return `
  <div class="widget-modal-content active" id="reset-password-seed">
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
    <div class="widget-seed-input-wrap">
      <div class="widget-seed-input-laebl">
        <label>
          Enter seed text
        </label>
      </div>
      <div class="widget-seed-input-container">
        <div class="widget-seed-input">
          <label>1</label>
          <input name="seed-1" type="text">
        </div>
        <div class="widget-seed-input">
          <label>2</label>
          <input name="seed-2" type="text">
        </div>
        <div class="widget-seed-input">
          <label>3</label>
          <input name="seed-3" type="text">
        </div>
        <div class="widget-seed-input">
          <label>4</label>
          <input name="seed-4" type="text">
        </div>
        <div class="widget-seed-input">
          <label>5</label>
          <input name="seed-5" type="text">
        </div>
        <div class="widget-seed-input">
          <label>6</label>
          <input name="seed-6" type="text">
        </div>
        <div class="widget-seed-input">
          <label>7</label>
          <input name="seed-7" type="text">
        </div>
        <div class="widget-seed-input">
          <label>8</label>
          <input name="seed-8" type="text">
        </div>
        <div class="widget-seed-input">
          <label>9</label>
          <input name="seed-9" type="text">
        </div>
        <div class="widget-seed-input">
          <label>10</label>
          <input name="seed-10" type="text">
        </div>
        <div class="widget-seed-input">
          <label>11</label>
          <input name="seed-11" type="text">
        </div>
        <div class="widget-seed-input">
          <label>12</label>
          <input name="seed-12" type="text">
        </div>
      </div>
    </div>
    <div class="widget-seed-input-laebl">
      <label id="error-message"></label>
    </div>
    <div class="widget-modal-button">
      <button id="submit-seed">
        Submit
      </button>
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
