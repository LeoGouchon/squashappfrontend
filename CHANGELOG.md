## [1.0.2](https://github.com/LeoGouchon/squashappfrontend/compare/v1.0.1...v1.0.2) (2026-06-14)


### Bug Fixes

* **auth:** store access token inside localStorage ([#20](https://github.com/LeoGouchon/squashappfrontend/issues/20)) ([54057eb](https://github.com/LeoGouchon/squashappfrontend/commit/54057ebeb95a2ec3cf3a1bf008556798c381b0cc))

## [1.0.1](https://github.com/LeoGouchon/squashappfrontend/compare/v1.0.0...v1.0.1) (2026-04-13)


### Bug Fixes

* add unbreakable space for some texts ([7e18b86](https://github.com/LeoGouchon/squashappfrontend/commit/7e18b86234ce32318d6f16a4da7b1c89166a4691))
* **admin:** team id was missing in player creation form ([d5903f9](https://github.com/LeoGouchon/squashappfrontend/commit/d5903f98bedc2aacdbf727ba8e660a9c71653a41))

# 1.0.0 (2026-03-28)


### Bug Fixes

* **api:** change all types to have an ID type equal to string and not number to match the backend ID type ([93a0a61](https://github.com/LeoGouchon/squashappfrontend/commit/93a0a611eb6c932d7a4a2d2347c2d3465dbd6a1b))
* **api:** fix auth api due to back changes ([8b24a81](https://github.com/LeoGouchon/squashappfrontend/commit/8b24a815c36e3916be3e9b9b05c48e641ef08dab))
* **api:** fix to the new api hubscore 1.0.0 version ([ba6bbfc](https://github.com/LeoGouchon/squashappfrontend/commit/ba6bbfcd2ec9d51fb94d0d8b266c812ae0743efa))
* **api:** fix to the new api hubscore 1.0.0 version ([20e7c93](https://github.com/LeoGouchon/squashappfrontend/commit/20e7c935d8d8d04ebac4e7a81f7363da9beedc9b))
* **api:** fix to the new api hubscore 1.0.0 version ([d8f8583](https://github.com/LeoGouchon/squashappfrontend/commit/d8f85830b8ed582c030b31467110fbe4cac50f6e))
* **app:** remove unused import ([1b7cdbe](https://github.com/LeoGouchon/squashappfrontend/commit/1b7cdbe5a8000f9a20a119722cb526f27a43c834))
* **current-match:** fix the bug that the match is not sent to the backend. Remove also unused imports ([2f3974b](https://github.com/LeoGouchon/squashappfrontend/commit/2f3974b1ba695eabb5fa7fd8160fa16db9da9254))
* **historic:** fix UI of session matche historic ([e779a7c](https://github.com/LeoGouchon/squashappfrontend/commit/e779a7ca29c1f8ef451e4ebfe6958433ccc3d417))
* **historic:** sorter match per desc datetime ([eac7438](https://github.com/LeoGouchon/squashappfrontend/commit/eac74389c233ff58ffff89fbd8635c5c5a3b6951))
* **loading&historic:** fix visual issues ([e94d2e8](https://github.com/LeoGouchon/squashappfrontend/commit/e94d2e82407338b5f293795c722651d48e96937c))
* **login/token:** fix refresh-token and post login navigation ([40f3960](https://github.com/LeoGouchon/squashappfrontend/commit/40f3960abfd4ddd1f53898ef3c82e60093c288db))
* **login/token:** fix refresh-token and post login navigation ([d49891d](https://github.com/LeoGouchon/squashappfrontend/commit/d49891ddc47246f6e0f9002651e04ac62929a91b))
* **login:** add error feedback for user ([bad9536](https://github.com/LeoGouchon/squashappfrontend/commit/bad953627a7b482fb9a712a32bb67049046fb825))
* **new match:** remove default score value, UX issue ([91e337b](https://github.com/LeoGouchon/squashappfrontend/commit/91e337b80d7dfd60d0c6f845d3f3319f689b170a))
* **prod:** fix to launch prod ([61a8185](https://github.com/LeoGouchon/squashappfrontend/commit/61a81851b90557476be3f554448be478429dbae2))


### Features

* **admin:** create process to add .env during prebuild ([493c4a2](https://github.com/LeoGouchon/squashappfrontend/commit/493c4a2e955d198c73306558ba303c8de43fd2c0))
* **admin:** create process to add .env during prebuild ([fce55cf](https://github.com/LeoGouchon/squashappfrontend/commit/fce55cf60b8797e64d9093867534491bb6bc44fd))
* **app:** add a footer to be like a pro web app 😎 ([17a2dbb](https://github.com/LeoGouchon/squashappfrontend/commit/17a2dbb9043c426f30a7ddb35f8141f94e98098e))
* **backend:** add loading while first backend call ([2a8968b](https://github.com/LeoGouchon/squashappfrontend/commit/2a8968baf7a51725b8b43c57bef00fa7466089e7))
* **CreateMatch:** add confirm message when you want to cancel the match creation ([45e1053](https://github.com/LeoGouchon/squashappfrontend/commit/45e105360aa9403926dd325aec66c15ed43ea0bc))
* **current-match:** rework the ux to send a match at the end ([c4ea330](https://github.com/LeoGouchon/squashappfrontend/commit/c4ea330cee7a603fe3c9c8a37e6951846b246fd8))
* **device support:** add quick desktop support ([dbe09da](https://github.com/LeoGouchon/squashappfrontend/commit/dbe09dafda0ba1e4e9c4d298a05701bbbf653cad))
* **globalStats:** add loser score bar chart ([f2684b9](https://github.com/LeoGouchon/squashappfrontend/commit/f2684b9c6a3baa065bd305858b607e487f417e13))
* **historic:** add confirm dialog before delete a match ([23dc014](https://github.com/LeoGouchon/squashappfrontend/commit/23dc0141b4ceaa678f6b87b446ba0df63e80ffc2))
* **historic:** add single page for detailled matches ([b5747f0](https://github.com/LeoGouchon/squashappfrontend/commit/b5747f06e00dbbfab120e7c694e499e05ba38fd3))
* **historic:** ugly quick session stat ([9c47caa](https://github.com/LeoGouchon/squashappfrontend/commit/9c47caa0344de0bfa5a380a2735fc65aa0b654e5))
* **historic:** user can now delete a previous match ([521a8d9](https://github.com/LeoGouchon/squashappfrontend/commit/521a8d9b6bf9c9754841f72b203ffce99966938b))
* **history:** first version of an history ([c87239f](https://github.com/LeoGouchon/squashappfrontend/commit/c87239fb82a0bde05fc95b6d9158095d2557feca))
* **home:** add temporary home page ([e5215f7](https://github.com/LeoGouchon/squashappfrontend/commit/e5215f7ad2635620f80b831550d4a7bd6a7abf0c))
* **home:** add temporary home page ([ae02342](https://github.com/LeoGouchon/squashappfrontend/commit/ae02342180f6eecacfa9190f607e1ddeafeafe28))
* **isAdmin:** add admin fetch ([a939dcb](https://github.com/LeoGouchon/squashappfrontend/commit/a939dcbf103e61b36db395c274af9510e230447f))
* **isAdmin:** add admin page ([342f77e](https://github.com/LeoGouchon/squashappfrontend/commit/342f77e34ec805534e2f625880adebd832407d37))
* **isAdmin:** add the possibility to add a new player ([ce91814](https://github.com/LeoGouchon/squashappfrontend/commit/ce91814de00f35e23979b65e2d7ba82e7b339142))
* **match:** can now create match without history ([1b7ea9e](https://github.com/LeoGouchon/squashappfrontend/commit/1b7ea9eab526ebdb62482d58b7ada126a2c006fd))
* **match:** first version of api called implemented ([7384302](https://github.com/LeoGouchon/squashappfrontend/commit/7384302df953637f82625b51e03a12c2bfd4434e))
* **match:** improve api and ux ([4c13de4](https://github.com/LeoGouchon/squashappfrontend/commit/4c13de46bba235aee63cc9af5dce24f5f0427e0f))
* **menu:** change ux of the menu and make it clearer ([a83d628](https://github.com/LeoGouchon/squashappfrontend/commit/a83d62866db5921d0ab18cc6c85b2c2ae213b8d2))
* **menu:** change ux of the menu and make it clearer ([00f5d91](https://github.com/LeoGouchon/squashappfrontend/commit/00f5d9115b95c12b98de67a8d5db94cadaa2bd65))
* **player-stats:** implement better UI ([03ec4ce](https://github.com/LeoGouchon/squashappfrontend/commit/03ec4ce797c8d9cfd07564190691c0798d0779e6))
* **player-stats:** limit the search on the api to SquashPlayer ([9488658](https://github.com/LeoGouchon/squashappfrontend/commit/9488658a0f3ba7d215c488e1271986051f7181ee))
* **players stats:** create pages and routes them ([f737277](https://github.com/LeoGouchon/squashappfrontend/commit/f7372777a789ef0be164ffec93ade22a83c60e72))
* **players stats:** create player selector content ([2f5adb2](https://github.com/LeoGouchon/squashappfrontend/commit/2f5adb2437e41d946d600c5802e853bc1b255163))
* **players stats:** create player selector content ([6231bac](https://github.com/LeoGouchon/squashappfrontend/commit/6231bac7fc6ee647980e83b8d78b4745f68e8bda))
* **playerStats:** add stats against individual player ([771fde1](https://github.com/LeoGouchon/squashappfrontend/commit/771fde1970e61288f804a21dff96169fae5bea7b))
* **profile:** create quick profile page to be able to log out ([cc7929c](https://github.com/LeoGouchon/squashappfrontend/commit/cc7929ce92d860638078fc95b52a59434c34554b))
* **referee_live:** can now undo last point ([532709a](https://github.com/LeoGouchon/squashappfrontend/commit/532709a7f601a4fe6df00006cba3a668bfd24811))
* **referee_live:** can now undo last point ([15b02d8](https://github.com/LeoGouchon/squashappfrontend/commit/15b02d8f4a615e445b656b2f45997f6023f74411))
* **stats:** connect the API ! ([d0dd50e](https://github.com/LeoGouchon/squashappfrontend/commit/d0dd50e64f2ebc09489d95393f13b60368b786f8))
* **stats:** connect the API ! ([f055820](https://github.com/LeoGouchon/squashappfrontend/commit/f05582030a3b7ce8a1da5d8fab8bf193bda5106c))
* **theme:** add dark/light switch button ([#11](https://github.com/LeoGouchon/squashappfrontend/issues/11)) ([c4fcbe8](https://github.com/LeoGouchon/squashappfrontend/commit/c4fcbe8366b89fab5187d0263ee9bcf3f2d3baa9))
* **user:** add login and sign up ([4e8bffa](https://github.com/LeoGouchon/squashappfrontend/commit/4e8bffa60c709a5a08cb2fccacf9a3c79a2c9173))
* **user:** add logout ([f23c9f4](https://github.com/LeoGouchon/squashappfrontend/commit/f23c9f46542860b6be42e23aa71dae995bf4ee69))

# Changelog
