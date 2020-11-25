import assert from 'assert';

import { UserService } from './../services/user_service.mjs';

describe("The UserService can" , async function() {
    it("can add a user", function () {
        const userService = new UserService();
        const username = "andy";
        const password = "trustno1";

        const theUser = userService.addUser(username, password);

        const retrievedUser = userService.loginUser(username, password);
        assert.deepStrictEqual(theUser, retrievedUser);
        assert.strictEqual(retrievedUser.username, username);
        assert.strictEqual(retrievedUser.password, password);
    });

    it("can login a valid user", function () {
        const userService = new UserService();
        const username = "andy";
        const password = "trustno1";

        const theUser = userService.addUser(username, password);

        const retrievedUser = userService.loginUser(username, password);
        assert.deepStrictEqual(theUser, retrievedUser);
    });

    it("can't login a invalid user", function () {
        const userService = new UserService();
        const username = "andy";
        const password = "trustno1";

        const theUser = userService.addUser(username, password);

        assert.deepStrictEqual(userService.loginUser(username + "tmp", password), null);
        assert.deepStrictEqual(userService.loginUser(username, password + "tmp"), null);
        assert.deepStrictEqual(userService.loginUser(username + "tmp", password + "tmp"), null);
    });
    
});