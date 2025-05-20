import { DefaultMutableDirectBuffer } from "../src/index";

describe("DirectBuffer", () => {
    test("putString should put string into the buffer", () => {
        const db = new DefaultMutableDirectBuffer(4);
        db.putString(0, "test");
        const buf = Array.from(db.byteArray());
        expect(db.getStringAscii(0, 4, buf)).toBe("test");
    });

    test("should wrap buffer with two shorts at offset 0", () => {
        const db = new DefaultMutableDirectBuffer();
        const buffer = new Uint8Array(10);
        const view = new DataView(buffer.buffer);
        view.setInt16(0, 32767, true);
        view.setInt16(2, -32767, true);
        db.wrap(buffer, 0, 4);
        const firstShort = db.getShort(0);
        const secondShort = db.getShort(2);
        expect(firstShort).toBe(32767);
        expect(secondShort).toBe(-32767);
    });

    test("should wrap buffer with two shorts at offset 50", () => {
        const db = new DefaultMutableDirectBuffer();
        const buffer = new Uint8Array(100);
        const view = new DataView(buffer.buffer);
        view.setInt16(0, 1234, true);
        view.setInt16(50, 32767, true);
        view.setInt16(52, -32768, true);
        db.wrap(buffer, 50, 4);
        const firstShort = db.getShort(0);
        const secondShort = db.getShort(2);
        expect(firstShort).toBe(32767);
        expect(secondShort).toBe(-32768);
    });
});
