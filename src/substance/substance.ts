class Substance {
    private _moveStatus?: string = '';
    public get moveStatus(): string {
        return this._moveStatus;
    }
    public set moveStatus(value: string) {
        this._moveStatus = value;
    }
    private type?: string = '';
    private name?: string = '';
}
export default Substance;