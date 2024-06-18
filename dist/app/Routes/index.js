"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = require("./../modules/user/user.route");
const express_1 = require("express");
const student_route_1 = require("../modules/student/student.route");
const router = (0, express_1.Router)();
router.use('/students', student_route_1.StudentRoutes);
router.use('/users', user_route_1.userRoutes);
exports.default = router;
