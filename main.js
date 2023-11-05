import "./style.css";
import "./src/ui/characters.container.js";

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Hello Clean Arch</h1>
    <p class="read-the-docs">
      Click on Next and Previous buttons
    </p>
    <characters-app></characters-app>
  </div>
`;
