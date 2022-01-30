const recordController = require('../../controllers/record');

const RecordModel = require('../../models/record');
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

describe("Fetching data", () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });
    

    it('Fetching record successfully with code 0', async () => {
        const req = {
            "body": {
                "startDate": "2015-01-20",
                "endDate": "2019-01-29",
                "minCount": 100,
                "maxCount": 3000
            }
        };
        RecordModel.aggregate = jest.fn().mockReturnValueOnce([]);
        const response = mockResponse();
        await recordController.getRecords(req, response);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.send).toHaveBeenCalledWith({ "code": 0, 'msg': "Success", "records": [] });
        return;
    })

    it('Status 500 for Server Error', async () => {
        const req = {
            "body": {
                "startDate": "2015-01-20",
                "endDate": "2019-01-29",
                "minCount": 100,
                "maxCount": 3000
            }
        };
        RecordModel.aggregate = jest.fn().mockImplementation(() => {
            throw new Error('User not found');
          })
        const response = mockResponse();
        await recordController.getRecords(req, response);
        expect(response.status).toHaveBeenCalledWith(500);
        return;
    })

    
});
