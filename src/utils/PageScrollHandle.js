const pageCount = 2;

export function pageScrollHandle(index) {
  if (index === 0) document.getElementById("page-1").scrollIntoView({
    behavior: "smooth"
  })
  else if (index === 1) document.getElementById("page-2").scrollIntoView({
    behavior: "smooth"
  })
  else if (index === 2) document.getElementById("message-board").scrollIntoView({
    behavior: "smooth"
  })
}

export function wheelScrollHandle(e, index) {
  if (e.deltaY > 0) {
    if (index !== pageCount) {
      pageScrollHandle(index + 1)
    }
  } else {
    if (index !== 0) {
      pageScrollHandle(index - 1)
    }
  }
}