import { Loader } from '../../assets/images';

export function loader() {
    return `
    <div id="loader">
      <div class="safle-loader">
        <div class="loader-container">
          ${ Loader }
        </div>
      </div>
    </div>`;
  }
  