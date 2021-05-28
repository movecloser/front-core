#Version 1.0.0-rc.70
*Contributors: Łukasz Jakubowski <lukasz.jakubowski@movecloser.pl>*

*27/05/2021*
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