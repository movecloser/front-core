"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableEntityError = exports.UnauthorizedError = exports.TooManyRequestsError = exports.TemporaryUnavailableError = exports.PermissionDeniedError = exports.NotImplementedError = exports.NotFoundError = exports.MissingPropertyError = exports.MissingParameter = exports.MappingError = exports.InternalServerError = exports.IncorrectValueError = exports.IncorrectCall = exports.DeprecatedError = exports.ConflictError = exports.ConnectionError = exports.BadRequestError = void 0;
var KernelError = /** @class */ (function () {
    function KernelError() {
        //@ts-ignore;
        Error.apply(this, arguments);
    }
    return KernelError;
}());
KernelError.prototype = new Error();
var BadRequestError = /** @class */ (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.name = 'BadRequestError';
        return _this;
    }
    return BadRequestError;
}(KernelError));
exports.BadRequestError = BadRequestError;
var ConnectionError = /** @class */ (function (_super) {
    __extends(ConnectionError, _super);
    function ConnectionError(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.name = 'ConflictError';
        return _this;
    }
    return ConnectionError;
}(KernelError));
exports.ConnectionError = ConnectionError;
var ConflictError = /** @class */ (function (_super) {
    __extends(ConflictError, _super);
    function ConflictError(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.name = 'ConflictError';
        return _this;
    }
    return ConflictError;
}(KernelError));
exports.ConflictError = ConflictError;
var DeprecatedError = /** @class */ (function (_super) {
    __extends(DeprecatedError, _super);
    function DeprecatedError(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.name = 'DeprecatedError';
        return _this;
    }
    return DeprecatedError;
}(KernelError));
exports.DeprecatedError = DeprecatedError;
var IncorrectCall = /** @class */ (function (_super) {
    __extends(IncorrectCall, _super);
    function IncorrectCall(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.name = 'IncorrectCall';
        return _this;
    }
    return IncorrectCall;
}(KernelError));
exports.IncorrectCall = IncorrectCall;
var IncorrectValueError = /** @class */ (function (_super) {
    __extends(IncorrectValueError, _super);
    function IncorrectValueError(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.name = 'IncorrectValueError';
        return _this;
    }
    return IncorrectValueError;
}(KernelError));
exports.IncorrectValueError = IncorrectValueError;
var InternalServerError = /** @class */ (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.name = 'InternalServerError';
        return _this;
    }
    return InternalServerError;
}(KernelError));
exports.InternalServerError = InternalServerError;
var MappingError = /** @class */ (function (_super) {
    __extends(MappingError, _super);
    function MappingError(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.name = 'MappingError';
        return _this;
    }
    return MappingError;
}(KernelError));
exports.MappingError = MappingError;
var MissingParameter = /** @class */ (function (_super) {
    __extends(MissingParameter, _super);
    function MissingParameter(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.name = 'MissingParameter';
        return _this;
    }
    return MissingParameter;
}(KernelError));
exports.MissingParameter = MissingParameter;
var MissingPropertyError = /** @class */ (function (_super) {
    __extends(MissingPropertyError, _super);
    function MissingPropertyError(key) {
        var _this = _super.call(this) || this;
        _this.key = key;
        _this.message = "Key: [" + _this.key + "] not found";
        _this.name = 'MissingPropertyError';
        return _this;
    }
    return MissingPropertyError;
}(KernelError));
exports.MissingPropertyError = MissingPropertyError;
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.name = 'NotFoundError';
        return _this;
    }
    return NotFoundError;
}(KernelError));
exports.NotFoundError = NotFoundError;
var NotImplementedError = /** @class */ (function (_super) {
    __extends(NotImplementedError, _super);
    function NotImplementedError(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.name = 'NotImplementedError';
        return _this;
    }
    return NotImplementedError;
}(KernelError));
exports.NotImplementedError = NotImplementedError;
var PermissionDeniedError = /** @class */ (function (_super) {
    __extends(PermissionDeniedError, _super);
    function PermissionDeniedError(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.name = 'PermissionDeniedError';
        return _this;
    }
    return PermissionDeniedError;
}(KernelError));
exports.PermissionDeniedError = PermissionDeniedError;
var TemporaryUnavailableError = /** @class */ (function (_super) {
    __extends(TemporaryUnavailableError, _super);
    function TemporaryUnavailableError(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.name = 'TemporaryUnavailableError';
        return _this;
    }
    return TemporaryUnavailableError;
}(KernelError));
exports.TemporaryUnavailableError = TemporaryUnavailableError;
var TooManyRequestsError = /** @class */ (function (_super) {
    __extends(TooManyRequestsError, _super);
    function TooManyRequestsError(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.name = 'TooManyRequestsError';
        return _this;
    }
    return TooManyRequestsError;
}(KernelError));
exports.TooManyRequestsError = TooManyRequestsError;
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.name = 'UnauthorizedError';
        return _this;
    }
    return UnauthorizedError;
}(KernelError));
exports.UnauthorizedError = UnauthorizedError;
var UnprocessableEntityError = /** @class */ (function (_super) {
    __extends(UnprocessableEntityError, _super);
    function UnprocessableEntityError(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.name = 'UnprocessableEntityError';
        return _this;
    }
    return UnprocessableEntityError;
}(KernelError));
exports.UnprocessableEntityError = UnprocessableEntityError;
