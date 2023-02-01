const BoardRepository = require('./board.repository');

describe('BoardRepository', () => {
    describe('createBoard', () => {
        let Board, hash, boardRepository;
    
        beforeEach(() => {
            Board = {
                create: jest.fn(() => Promise.resolve({id: 1}))
            };
            hash = {
                findOrCreate: jest.fn(() => Promise.resolve([{id: 1}, false]))
            };
            boardRepository = new BoardRepository({Board, hash});
        });
    
        it('should create a board', async () => {
            const boardData = {
                subject: 'Test Subject',
                content: 'Test Content',
                hashtagText: ['test'],
                userId: 1
            };
    
            const result = await boardRepository.createBoard(boardData);
    
            expect(Board.create).toHaveBeenCalledWith({
                subject: 'Test Subject',
                content: 'Test Content',
                userId: 1
            });
            expect(hash.findOrCreate).toHaveBeenCalledWith({where: {hashtag: 'test'}});
            expect(result).toEqual({id: 1});
        });
    
        it('should throw an error if board creation fails', async () => {
            Board.create = jest.fn(() => Promise.reject(new Error('Error while creating board')));
    
            try {
                await boardRepository.createBoard({});
            } catch (error) {
                expect(error.message).toBe('Error while creating board: Error while creating board');
            }
        });
    });
});
