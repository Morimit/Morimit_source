/*!
 *   Hugo Theme Stack
 *
 *   @author: Jimmy Cai
 *   @website: https://jimmycai.com
 *   @link: https://github.com/CaiJimmy/hugo-theme-stack
 */
import StackGallery from "ts/gallery";
import { getColor } from "ts/color";
import menu from "ts/menu";
import createElement from "ts/createElement";
import StackColorScheme from "ts/colorScheme";
import { setupScrollspy } from "ts/scrollspy";
import { setupSmoothAnchors } from "ts/smoothAnchors";

let Stack = {
  init: () => {
    /**
     * Bind menu event
     */
    menu();

    const articleContent = document.querySelector(
      ".article-content"
    ) as HTMLElement;
    if (articleContent) {
      new StackGallery(articleContent);
      setupSmoothAnchors();
      setupScrollspy();
    }

    /**
     * Add linear gradient background to tile style article
     */
    // const articleTile = document.querySelector('.article-list--tile');
    // if (articleTile) {
    //     let observer = new IntersectionObserver(async (entries, observer) => {
    //         entries.forEach(entry => {
    //             if (!entry.isIntersecting) return;
    //             observer.unobserve(entry.target);

    //             const articles = entry.target.querySelectorAll('article.has-image');
    //             articles.forEach(async articles => {
    //                 const image = articles.querySelector('img'),
    //                     imageURL = image.src,
    //                     key = image.getAttribute('data-key'),
    //                     hash = image.getAttribute('data-hash'),
    //                     articleDetails: HTMLDivElement = articles.querySelector('.article-details');

    //                 const colors = await getColor(key, hash, imageURL);

    //                 articleDetails.style.background = `
    //                 linear-gradient(0deg,
    //                     rgba(${colors.DarkMuted.rgb[0]}, ${colors.DarkMuted.rgb[1]}, ${colors.DarkMuted.rgb[2]}, 0.5) 0%,
    //                     rgba(${colors.Vibrant.rgb[0]}, ${colors.Vibrant.rgb[1]}, ${colors.Vibrant.rgb[2]}, 0.75) 100%)`;
    //             })
    //         })
    //     });

    //     observer.observe(articleTile)
    // }

    /**
     * Add copy button to code block
     */
    const highlights = document.querySelectorAll(
      ".article-content div.highlight"
    );
    const copyText = `Copy`,
      copiedText = `Copied!`;

    highlights.forEach((highlight) => {
      const copyButton = document.createElement("button");
      copyButton.innerHTML = copyText;
      copyButton.classList.add("copyCodeButton");
      highlight.appendChild(copyButton);

      const codeBlock = highlight.querySelector("code[data-lang]");
      if (!codeBlock) return;

      copyButton.addEventListener("click", () => {
        navigator.clipboard
          .writeText(codeBlock.textContent)
          .then(() => {
            copyButton.textContent = copiedText;

            setTimeout(() => {
              copyButton.textContent = copyText;
            }, 1000);
          })
          .catch((err) => {
            alert(err);
            console.log("Something went wrong", err);
          });
      });
    });

    new StackColorScheme(document.getElementById("dark-mode-toggle"));

    /**
     * Add back to top button to single page
     */
    const backToTop = document.querySelector("button.back-to-top");

    if (backToTop) {
      document.addEventListener("scroll", () => {
        const scrollContainer = () => {
          // document.body 对应Safiri
          return document.documentElement || document.body;
        };

        if (scrollContainer().scrollTop > 100) {
          backToTop.classList.remove("hidden");
        } else {
          backToTop.classList.add("hidden");
        }
      });

      backToTop.addEventListener("click", () => {
        document.body.scrollIntoView({
          behavior: "smooth",
        });
      });
    }

    // note-left-toc (phone-style)
    const noteLeftTocIcon = document.getElementById("note-toc-icon");
    const noteLeftToc = document.querySelector(".note-toc");
    const mask = document.querySelector(".mask");

    if (noteLeftTocIcon) {
      noteLeftTocIcon.addEventListener("click", () => {
        noteLeftToc.classList.add("toc-slide");
        mask.classList.add("show-mask");

        setTimeout(() => {
          mask.classList.add("show-color");
          noteLeftToc.classList.add("slide");
        }, 10);
      });
    }

    if (mask) {
      mask.addEventListener("click", () => {
        noteLeftToc.classList.remove("slide");
        mask.classList.remove("show-color");

        setTimeout(() => {
          noteLeftToc.classList.remove("toc-slide");
          mask.classList.remove("show-mask");
        }, 100);
      });
    }
  },
};

window.addEventListener("load", () => {
  setTimeout(function () {
    Stack.init();
  }, 0);
});

declare global {
  interface Window {
    createElement: any;
    Stack: any;
  }
}

window.Stack = Stack;
window.createElement = createElement;
