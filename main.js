(()=>{"use strict";var e={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-33",headers:{authorization:"1ad8ca18-9189-43b5-8819-a2f6900b4a3a","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var n=document.querySelector("#card-template").content;function o(n){var o=n.target,r=o.closest(".places__item"),c=r.querySelector(".card__like-counter"),a=r.dataset.id;o.classList.contains("card__like-button_is-active")?function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t).catch((function(e){console.log("Ошибка: ".concat(e))}))}(a).then((function(e){o.classList.remove("card__like-button_is-active"),c.textContent=e.likes.length})).catch((function(e){return console.log("Ошибка при дизлайке: ".concat(e))})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t).catch((function(e){console.log("Ошибка: ".concat(e))}))}(a).then((function(e){o.classList.add("card__like-button_is-active"),c.textContent=e.likes.length})).catch((function(e){return console.log("Ошибка при лайке: ".concat(e))}))}function r(e,t,r,c){var a=e.name,u=e.link,i=e.likes,l=void 0===i?[]:i,s=e.owner,d=e._id,p=n.querySelector(".places__item").cloneNode(!0);p.dataset.id=d;var f=p.querySelector(".card__image");f.src=u,f.alt=a,p.querySelector(".card__title").textContent=a,p.querySelector(".card__like-counter").textContent=l.length;var _=p.querySelector(".card__delete-button");return s&&s._id===t?_.addEventListener("click",(function(){return r(p,d)})):_.remove(),p.querySelector(".card__like-button").addEventListener("click",o),f.addEventListener("click",(function(){return c(a,u)})),p}function c(e){e.remove()}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",i)}function u(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i)}function i(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&u(t)}}function l(e){e.target.classList.contains("popup")&&u(e.target)}function s(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}function d(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function p(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){return s(e,n,t)})),o.disabled=!0,o.classList.add(t.inactiveButtonClass)}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var _={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){return e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);d(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,r,t),d(n,o,t)}))}))}(t,e)}))}(_);var m=document.querySelector(".popup_type_edit .popup__form"),y=document.querySelector(".popup_type_new-card .popup__form"),v=document.querySelector(".popup_type_edit"),h=document.querySelector(".popup_type_new-card"),S=document.querySelector(".popup_type_image"),b=document.querySelector(".profile__edit-button"),q=document.querySelector(".profile__add-button"),C=document.querySelectorAll(".popup__close"),g=S.querySelector(".popup__image"),E=S.querySelector(".popup__caption"),L=document.querySelector(".places__list"),k=document.querySelector(".popup__input_type_name"),x=document.querySelector(".popup__input_type_description"),A=document.querySelector(".profile__title"),U=document.querySelector(".profile__description"),w=document.querySelector(".popup__input_type_card-name"),T=document.querySelector(".popup__input_type_url"),j=document.querySelector(".popup_type_avatar"),B=j.querySelector(".popup__form"),O=B.querySelector(".popup__input_type_avatar-url"),D=document.querySelector(".profile__image-container"),P=document.querySelector(".profile__image");function I(e,t){g&&E?(g.src=t,g.alt=e||"Изображение",E.textContent=e||"Без названия",a(S)):console.error("Ошибка: popupImage или popupCaption не найдены!")}function M(n,o){(function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t).catch((function(e){console.log("Ошибка: ".concat(e))}))})(o).then((function(){n.remove()})).catch((function(e){console.error("Ошибка при удалении карточки: ".concat(e))}))}m.addEventListener("submit",(function(n){n.preventDefault();var o,r,c=k.value,a=x.value,i=m.querySelector(".popup__button");i.textContent="Сохранение...",i.disabled=!0,(o=c,r=a,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:o,about:r})}).then(t).catch((function(e){console.log("Ошибка: ".concat(e))}))).then((function(e){A.textContent=e.name,U.textContent=e.about,u(v)})).catch((function(e){console.log("Ошибка при обновлении профиля: ".concat(e))})).finally((function(){i.textContent="Сохранить",i.disabled=!1}))})),y.addEventListener("submit",(function(n){n.preventDefault();var a,i,l=w.value,s=T.value,d=y.querySelector(".popup__button");d.textContent="Сохранение...",d.disabled=!0,(a=l,i=s,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:a,link:i})}).then(t).catch((function(e){console.log("Ошибка: ".concat(e))}))).then((function(e){var t=r(e,c,I,o);L.prepend(t),y.reset(),u(h)})).catch((function(e){console.log("Ошибка при добавлении карточки: ".concat(e))})).finally((function(){d.textContent="Сохранить",d.disabled=!1}))})),b.addEventListener("click",(function(){k.value=A.textContent,x.value=U.textContent,p(m,_),a(v)})),q.addEventListener("click",(function(){y.reset(),p(y,_),a(h)})),C.forEach((function(e){e.addEventListener("click",(function(){var t=e.closest(".popup");t&&u(t)}))})),document.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated"),e.addEventListener("mousedown",l)})),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{method:"GET",headers:e.headers}).then(t).catch((function(e){console.log("Ошибка: ".concat(e))})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t).catch((function(e){console.log("Ошибка в getInitialCards: ".concat(e))}))]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(o=c.call(n)).done)&&(u.push(o.value),u.length!==t);i=!0);}catch(e){l=!0,r=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1];A.textContent=c.name,U.textContent=c.about,P.src=c.avatar,function(e,t){e.forEach((function(e){var n=r(e,t,M,I);L.append(n)}))}(a,c._id)})).catch((function(e){console.error("Ошибка при загрузке данных: ".concat(e))})),D.addEventListener("click",(function(){B.reset(),p(B,_),a(j)})),B.addEventListener("submit",(function(n){n.preventDefault();var o,r=O.value,c=B.querySelector(".popup__button");c.textContent="Сохранение...",c.disabled=!0,(o=r,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:o})}).then(t).catch((function(e){console.log("Ошибка: ".concat(e))}))).then((function(e){P.src=e.avatar,u(j),B.reset()})).catch((function(e){console.error("Ошибка при обновлении аватара: ".concat(e))})).finally((function(){c.textContent="Сохранить",c.disabled=!1}))}))})();