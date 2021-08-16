# Changelog

## 1.0.0-rc.75 | 2021-08-16

###Bugfixes:
* Token: Fixed abstract token constructor arguments types
* AuthService: Handled the case where the value in local storage was falsy
* AuthService: Created parseLocalStorageValue method and caught exceptions thrown by it

---

## 1.0.0-rc.74 | 2021-07-27

###Features:
* Add 'nl' (not like) operator to filter parser

---

## 1.0.0-rc.73 | 2021-07-17

###Bugfixes:
* Fixed case when there's no token in localStorage & app is still trying to refresh

---

## 1.0.0-rc.70 | 2021-05-27
*Contributors: Łukasz Jakubowski <lukasz.jakubowski@movecloser.pl>*

###Changes:
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
