class Scroller {
  constructor(rootSelector) {
    this.sections = [...document.querySelectorAll("section")];
    const currentSectionIndex = this.sections.findIndex(
      this.isScrolledIntoView
    );
    this.currentSectionIndex = Math.max(currentSectionIndex, 0);
    this.isThrottled = false;
    this.scroll = this.scroll.bind(this);

    this.drawNavigation();
    this.selectActiveNavItem();
  }

  isScrolledIntoView(element) {
    const rect = element.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = Math.floor(rect.bottom);
    const isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
    return isVisible;
  }

  listenScroll = (e) => {
    if (this.isThrottled) return;
    this.isThrottled = true;
    setTimeout(() => {
      this.isThrottled = false;
    }, 1000);
    const direction = e.deltaY > 0 ? 1 : -1;
    this.scroll(direction);
  };
  scroll(direction) {
    if (direction === 1) {
      const isLastSection =
        this.currentSectionIndex === this.sections.length - 1;
      if (isLastSection) return;
    } else if (direction === -1) {
      const firstSection = this.currentSectionIndex === 0;
      if (firstSection) return;
    }
    this.currentSectionIndex = this.currentSectionIndex + direction;
    this.scrollToCurrentSection(this.currentSectionIndex);
  }
  scrollToCurrentSection() {
    this.selectActiveNavItem();
    this.sections[this.currentSectionIndex].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
  drawNavigation() {
    this.navigationContainer = document.createElement("aside");
    this.navigationContainer.className = "scroller__navigation";
    const list = document.createElement("ul");
    this.sections.forEach((section, index) => {
      const listItem = document.createElement("li");
      listItem.addEventListener("click", () => {
        this.currentSectionIndex = index;
        this.scrollToCurrentSection();
      });
      list.appendChild(listItem);
    });

    this.navigationContainer.append(list);
    document.body.appendChild(this.navigationContainer);
  }
  selectActiveNavItem() {
    const navigationItems = this.navigationContainer.querySelectorAll("li");
    navigationItems.forEach((item, index) => {
      if (index === this.currentSectionIndex) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }
}
