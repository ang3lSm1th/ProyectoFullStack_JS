"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const supertest_1 = __importDefault(require("supertest"));
const app_module_1 = require("./../src/app.module");
describe('HealthController (e2e)', () => {
    let app;
    beforeEach(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.setGlobalPrefix('api/v1');
        await app.init();
    });
    it('/api/v1/health (GET)', () => {
        return (0, supertest_1.default)(app.getHttpServer())
            .get('/api/v1/health')
            .expect(200)
            .expect((res) => {
            expect(res.body.status).toBe('ok');
            expect(res.body.service).toBe('api');
            expect(res.body.timestamp).toBeDefined();
        });
    });
    afterEach(async () => {
        await app.close();
    });
});
//# sourceMappingURL=app.e2e-spec.js.map