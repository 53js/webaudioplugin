/* eslint-disable import/no-unresolved */
// import { TContext } from "standardized-audio-context";
import processorURL from "omt:./TemporalAnalyser.worklet.ts"; // eslint-disable-line import/extensions
import AudioWorkletProxyNode from "./AudioWorkletProxyNode";
import { ITemporalAnalyserNode, ITemporalAnalyserProcessor, TemporalAnalyserParameters } from "./TemporalAnalyserWorklet.types";
import AudioWorkletRegister from "./AudioWorkletRegister";

export const processorID = "__WebAudioModule_LiveGain_TemporalAnalyser";
export class TemporalAnalyserNode extends AudioWorkletProxyNode<ITemporalAnalyserNode, ITemporalAnalyserProcessor, TemporalAnalyserParameters> {
    static fnNames: (keyof ITemporalAnalyserProcessor)[] = ["getRMS", "getAbsMax", "getZCR", "getBuffer", "destroy"];
    constructor(context: BaseAudioContext) {
        super(context, processorID, { numberOfInputs: 1, numberOfOutputs: 0 });
        const _destroy = this.destroy;
        this.destroy = async () => {
            await _destroy.call(this);
            this.port.close();
        };
    }
}
export const register = (audioWorklet: AudioWorklet) => AudioWorkletRegister.register(audioWorklet, processorID, processorURL);
export const Node = TemporalAnalyserNode;