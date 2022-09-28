# Changelog

## 1.2.0 | 2022.09.28

### New features:

* Pass config to module's boot method and routes factory.

## 1.1.2 | 2022.09.08

### Fixes:

* Fix scroll lock on modal open.

## 1.1.1 | 2020.03.02

### Fixes:

* Incorrect condition conjunction at Validation's `onClear` method.

## 1.1.0 | 2020.02.03

### New Features:

* Async middleware hooks.
* CSRF service.

## 1.0.0 | 2022.02.03

### Fixes:

* Fixed typo at middleware name.

### Improvements:

* Added other supported response types to Enum value.

## 1.0.0-rc.80 | 2021.11.09

### Fixes:

* Fixed incorrect handling of null values in adapter.

---

## 1.0.0-rc.79 | 2021.11.04

### Fixes:

* Fixed incorrect assign of modal's config to defaults.

---

## 1.0.0-rc.78 | 2021.10.27

### Improvements:

* Added option to register new modals via `register` method.
* Fixed security issue of prototype pollution during adapter's mapping.

---

## 1.0.0-rc.76 | 2021.09.02

### Improvements:

* Changed adapter log level.

---

## 1.0.0-rc.75 | 2021-08-16

### Bugfixes:

* Token: Fixed abstract token constructor arguments types
* AuthService: Handled the case where the value in local storage was falsy
* AuthService: Created parseLocalStorageValue method and caught exceptions thrown by it
* AuthMiddleware: Changed condition to allow turning off `Authorization` header

---

## 1.0.0-rc.74 | 2021-07-27

### Features:

* Add 'nl' (not like) operator to filter parser

---

## 1.0.0-rc.73 | 2021-07-17

### Bugfixes:

* Fixed case when there's no token in localStorage & app is still trying to refresh

---

## 1.0.0-rc.70 | 2021-05-27

*Contributors: Łukasz Jakubowski <lukasz.jakubowski@movecloser.pl>*

### Changes:

* Added clone method to the Model
* Added applyIntention method to the Model
* Added tests for all token types
* Added tests for the document service
* Added mapping type of 'self' in the adapter
* Rewrite validation middleware to use test scheduler and marbles
  ###Bugfixes:
* Fixed document service contracts
* Fixed typing in the checkRequiredProperties method of the Token
* Fixed onClear method callback in validation middleware
* Fixed bug in the hasMany method of the Model: added additional Array.isArray() check
* IMPORTANT! Fixed method check in get handler of the proxy - hasOwnProperty did not work
