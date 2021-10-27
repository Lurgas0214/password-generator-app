import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

class PasswordGeneratorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lowerChars: "abcdefghijklmnopqrstuvwxyz",
            upperChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            digits: "0123456789",
            symbols: "?!",

            numberOfSymbols: 13,
            withLowerCase: true,
            withUpperCase: true,
            withSymbols: true,
            withDigits: true,

            password: ""
        };
    }

    includes = (src, dst) => {
        const e = src.split("");
        let ctr = false;
        e.forEach(c => {
            if (dst.includes(c)) ctr = true;
        });
        return ctr;
    };

    isIncomplete = (passphrase) => {
        const { digits, symbols, lowerChars, upperChars, withDigits, withSymbols, withLowerCase, withUpperCase } = this.state;

        if (withDigits && !this.includes(digits, passphrase)) return true;
        if (withSymbols && !this.includes(symbols, passphrase)) return true;
        if (withLowerCase && !this.includes(lowerChars, passphrase)) return true;
        if (withUpperCase && !this.includes(upperChars, passphrase)) return true;

        return false;
    };

    generatePassword = (number) => {
        const { digits, symbols, lowerChars, upperChars, withDigits, withSymbols, withLowerCase, withUpperCase } = this.state;
        let chars = "", result, max, i;

        if (withDigits) chars += digits;
        if (withSymbols) chars += symbols;
        if (withLowerCase) chars += lowerChars;
        if (withUpperCase) chars += upperChars;

        max = chars.length;

        do {
            result = "";
            for (i = 0; i < number; i++)
                result += chars[Math.floor(Math.random() * max)];
        } while (this.isIncomplete(result));

        return result;
    };

    onCopyHandle = () => {
        const copyText = document.getElementById("password");

        copyText.select();
        copyText.setSelectionRange(0, 99999);

        document.execCommand("copy");
    };

    onClickHandle = () => {
        const value = this.state.numberOfSymbols;

        if (value >= 5) this.setState({ password: this.generatePassword(value) });
    };

    onCheckBoxHandle = (attribute) => {
        const value = !this.state[attribute];

        this.setState({ [attribute]: value })
    };

    onChangeHandle = ({ target }) => {
        const value = target.value;

        this.setState({ numberOfSymbols: value })
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <input type="checkbox" checked={this.state.withSymbols} onChange={() =>
                                    this.onCheckBoxHandle("withSymbols")} /> include symbols ({this.state.symbols})
                            </li>
                            <li className="list-group-item">
                                <input type="checkbox" checked={this.state.withDigits} onChange={() =>
                                    this.onCheckBoxHandle("withDigits")} /> include digits ({this.state.digits})
                            </li>
                            <li className="list-group-item">
                                <input type="checkbox" checked={this.state.withLowerCase} onChange={() =>
                                    this.onCheckBoxHandle("withLowerCase")} /> include lower characters ({this.state.lowerChars})
                            </li>
                            <li className="list-group-item">
                                <input type="checkbox" checked={this.state.withUpperCase} onChange={() =>
                                    this.onCheckBoxHandle("withUpperCase")} /> include upper character ({this.state.upperChars})
                            </li>
                        </ul>
                    </div>
                    <div className="col">
                        <div className="input-group">
                            <label className="input-group-text">Number of Symbols</label>
                            <input
                                onChange={this.onChangeHandle}
                                className="form-control"
                                defaultValue={this.state.numberOfSymbols}
                                type="Number"
                                step="1"
                                min="5"
                            />
                            <button
                                className="input-group-text btn btn-outline-info"
                                onClick={this.onClickHandle}
                            >Generate Password</button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col input-group">
                        <label className="input-group-text">Generated Password</label>
                        <input id="password" className="form-control" type="Text" readOnly={true} value={this.state.password} />
                        <button className="input-group-text btn btn-outline-info" onClick={this.onCopyHandle}>copy to clipboard</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PasswordGeneratorComponent;
