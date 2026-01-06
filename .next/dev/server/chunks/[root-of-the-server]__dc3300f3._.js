module.exports = [
"[project]/node_modules/@apollo/utils.isnodelike/dist/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isNodeLike = void 0;
exports.isNodeLike = typeof process === "object" && process && process.release && process.versions && typeof process.versions.node === "string"; //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/@apollo/utils.keyvaluecache/dist/PrefixingKeyValueCache.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PrefixingKeyValueCache = void 0;
const prefixesAreUnnecessaryForIsolationSymbol = Symbol("prefixesAreUnnecessaryForIsolation");
class PrefixingKeyValueCache {
    constructor(wrapped, prefix){
        this.wrapped = wrapped;
        if (PrefixingKeyValueCache.prefixesAreUnnecessaryForIsolation(wrapped)) {
            this.prefix = "";
            this[prefixesAreUnnecessaryForIsolationSymbol] = true;
        } else {
            this.prefix = prefix;
        }
    }
    get(key) {
        return this.wrapped.get(this.prefix + key);
    }
    set(key, value, options) {
        return this.wrapped.set(this.prefix + key, value, options);
    }
    delete(key) {
        return this.wrapped.delete(this.prefix + key);
    }
    static prefixesAreUnnecessaryForIsolation(c) {
        return prefixesAreUnnecessaryForIsolationSymbol in c;
    }
    static cacheDangerouslyDoesNotNeedPrefixesForIsolation(c) {
        return new PrefixesAreUnnecessaryForIsolationCache(c);
    }
}
exports.PrefixingKeyValueCache = PrefixingKeyValueCache;
class PrefixesAreUnnecessaryForIsolationCache {
    constructor(wrapped){
        this.wrapped = wrapped;
        this[_a] = true;
    }
    get(key) {
        return this.wrapped.get(key);
    }
    set(key, value, options) {
        return this.wrapped.set(key, value, options);
    }
    delete(key) {
        return this.wrapped.delete(key);
    }
}
_a = prefixesAreUnnecessaryForIsolationSymbol; //# sourceMappingURL=PrefixingKeyValueCache.js.map
}),
"[project]/node_modules/@apollo/utils.keyvaluecache/dist/InMemoryLRUCache.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InMemoryLRUCache = void 0;
const lru_cache_1 = __turbopack_context__.r("[project]/node_modules/@apollo/utils.keyvaluecache/node_modules/lru-cache/dist/commonjs/index.js [app-route] (ecmascript)");
class InMemoryLRUCache {
    constructor(lruCacheOpts){
        this.cache = new lru_cache_1.LRUCache({
            sizeCalculation: InMemoryLRUCache.sizeCalculation,
            maxSize: Math.pow(2, 20) * 30,
            ...lruCacheOpts
        });
    }
    static sizeCalculation(item) {
        if (typeof item === "string") {
            return item.length;
        }
        if (typeof item === "object") {
            return Buffer.byteLength(JSON.stringify(item), "utf8");
        }
        return 1;
    }
    async set(key, value, options) {
        const lruOptions = options ? {
            ...options,
            ttl: options.ttl ? options.ttl * 1000 : 0
        } : undefined;
        this.cache.set(key, value, lruOptions);
    }
    async get(key) {
        return this.cache.get(key);
    }
    async delete(key) {
        return this.cache.delete(key);
    }
    clear() {
        this.cache.clear();
    }
    keys() {
        return [
            ...this.cache.keys()
        ];
    }
}
exports.InMemoryLRUCache = InMemoryLRUCache; //# sourceMappingURL=InMemoryLRUCache.js.map
}),
"[project]/node_modules/@apollo/utils.keyvaluecache/dist/ErrorsAreMissesCache.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ErrorsAreMissesCache = void 0;
class ErrorsAreMissesCache {
    constructor(cache, logger){
        this.cache = cache;
        this.logger = logger;
    }
    async get(key) {
        try {
            return await this.cache.get(key);
        } catch (e) {
            if (this.logger) {
                if (e instanceof Error) {
                    this.logger.error(e.message);
                } else {
                    this.logger.error(e);
                }
            }
            return undefined;
        }
    }
    async set(key, value, opts) {
        return this.cache.set(key, value, opts);
    }
    async delete(key) {
        return this.cache.delete(key);
    }
}
exports.ErrorsAreMissesCache = ErrorsAreMissesCache; //# sourceMappingURL=ErrorsAreMissesCache.js.map
}),
"[project]/node_modules/@apollo/utils.keyvaluecache/dist/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ErrorsAreMissesCache = exports.InMemoryLRUCache = exports.PrefixingKeyValueCache = void 0;
var PrefixingKeyValueCache_1 = __turbopack_context__.r("[project]/node_modules/@apollo/utils.keyvaluecache/dist/PrefixingKeyValueCache.js [app-route] (ecmascript)");
Object.defineProperty(exports, "PrefixingKeyValueCache", {
    enumerable: true,
    get: function() {
        return PrefixingKeyValueCache_1.PrefixingKeyValueCache;
    }
});
var InMemoryLRUCache_1 = __turbopack_context__.r("[project]/node_modules/@apollo/utils.keyvaluecache/dist/InMemoryLRUCache.js [app-route] (ecmascript)");
Object.defineProperty(exports, "InMemoryLRUCache", {
    enumerable: true,
    get: function() {
        return InMemoryLRUCache_1.InMemoryLRUCache;
    }
});
var ErrorsAreMissesCache_1 = __turbopack_context__.r("[project]/node_modules/@apollo/utils.keyvaluecache/dist/ErrorsAreMissesCache.js [app-route] (ecmascript)");
Object.defineProperty(exports, "ErrorsAreMissesCache", {
    enumerable: true,
    get: function() {
        return ErrorsAreMissesCache_1.ErrorsAreMissesCache;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/@apollo/utils.keyvaluecache/node_modules/lru-cache/dist/commonjs/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @module LRUCache
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LRUCache = void 0;
const defaultPerf = typeof performance === 'object' && performance && typeof performance.now === 'function' ? performance : Date;
const warned = new Set();
/* c8 ignore start */ const PROCESS = typeof process === 'object' && !!process ? process : {};
/* c8 ignore start */ const emitWarning = (msg, type, code, fn)=>{
    typeof PROCESS.emitWarning === 'function' ? PROCESS.emitWarning(msg, type, code, fn) : console.error(`[${code}] ${type}: ${msg}`);
};
let AC = globalThis.AbortController;
let AS = globalThis.AbortSignal;
/* c8 ignore start */ if (typeof AC === 'undefined') {
    //@ts-ignore
    AS = class AbortSignal {
        onabort;
        _onabort = [];
        reason;
        aborted = false;
        addEventListener(_, fn) {
            this._onabort.push(fn);
        }
    };
    //@ts-ignore
    AC = class AbortController {
        constructor(){
            warnACPolyfill();
        }
        signal = new AS();
        abort(reason) {
            if (this.signal.aborted) return;
            //@ts-ignore
            this.signal.reason = reason;
            //@ts-ignore
            this.signal.aborted = true;
            //@ts-ignore
            for (const fn of this.signal._onabort){
                fn(reason);
            }
            this.signal.onabort?.(reason);
        }
    };
    let printACPolyfillWarning = PROCESS.env?.LRU_CACHE_IGNORE_AC_WARNING !== '1';
    const warnACPolyfill = ()=>{
        if (!printACPolyfillWarning) return;
        printACPolyfillWarning = false;
        emitWarning('AbortController is not defined. If using lru-cache in ' + 'node 14, load an AbortController polyfill from the ' + '`node-abort-controller` package. A minimal polyfill is ' + 'provided for use by LRUCache.fetch(), but it should not be ' + 'relied upon in other contexts (eg, passing it to other APIs that ' + 'use AbortController/AbortSignal might have undesirable effects). ' + 'You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.', 'NO_ABORT_CONTROLLER', 'ENOTSUP', warnACPolyfill);
    };
}
/* c8 ignore stop */ const shouldWarn = (code)=>!warned.has(code);
const TYPE = Symbol('type');
const isPosInt = (n)=>n && n === Math.floor(n) && n > 0 && isFinite(n);
/* c8 ignore start */ // This is a little bit ridiculous, tbh.
// The maximum array length is 2^32-1 or thereabouts on most JS impls.
// And well before that point, you're caching the entire world, I mean,
// that's ~32GB of just integers for the next/prev links, plus whatever
// else to hold that many keys and values.  Just filling the memory with
// zeroes at init time is brutal when you get that big.
// But why not be complete?
// Maybe in the future, these limits will have expanded.
const getUintArray = (max)=>!isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;
/* c8 ignore stop */ class ZeroArray extends Array {
    constructor(size){
        super(size);
        this.fill(0);
    }
}
class Stack {
    heap;
    length;
    // private constructor
    static #constructing = false;
    static create(max) {
        const HeapCls = getUintArray(max);
        if (!HeapCls) return [];
        Stack.#constructing = true;
        const s = new Stack(max, HeapCls);
        Stack.#constructing = false;
        return s;
    }
    constructor(max, HeapCls){
        /* c8 ignore start */ if (!Stack.#constructing) {
            throw new TypeError('instantiate Stack using Stack.create(n)');
        }
        /* c8 ignore stop */ this.heap = new HeapCls(max);
        this.length = 0;
    }
    push(n) {
        this.heap[this.length++] = n;
    }
    pop() {
        return this.heap[--this.length];
    }
}
/**
 * Default export, the thing you're using this module to get.
 *
 * The `K` and `V` types define the key and value types, respectively. The
 * optional `FC` type defines the type of the `context` object passed to
 * `cache.fetch()` and `cache.memo()`.
 *
 * Keys and values **must not** be `null` or `undefined`.
 *
 * All properties from the options object (with the exception of `max`,
 * `maxSize`, `fetchMethod`, `memoMethod`, `dispose` and `disposeAfter`) are
 * added as normal public members. (The listed options are read-only getters.)
 *
 * Changing any of these will alter the defaults for subsequent method calls.
 */ class LRUCache {
    // options that cannot be changed without disaster
    #max;
    #maxSize;
    #dispose;
    #onInsert;
    #disposeAfter;
    #fetchMethod;
    #memoMethod;
    #perf;
    /**
     * {@link LRUCache.OptionsBase.perf}
     */ get perf() {
        return this.#perf;
    }
    /**
     * {@link LRUCache.OptionsBase.ttl}
     */ ttl;
    /**
     * {@link LRUCache.OptionsBase.ttlResolution}
     */ ttlResolution;
    /**
     * {@link LRUCache.OptionsBase.ttlAutopurge}
     */ ttlAutopurge;
    /**
     * {@link LRUCache.OptionsBase.updateAgeOnGet}
     */ updateAgeOnGet;
    /**
     * {@link LRUCache.OptionsBase.updateAgeOnHas}
     */ updateAgeOnHas;
    /**
     * {@link LRUCache.OptionsBase.allowStale}
     */ allowStale;
    /**
     * {@link LRUCache.OptionsBase.noDisposeOnSet}
     */ noDisposeOnSet;
    /**
     * {@link LRUCache.OptionsBase.noUpdateTTL}
     */ noUpdateTTL;
    /**
     * {@link LRUCache.OptionsBase.maxEntrySize}
     */ maxEntrySize;
    /**
     * {@link LRUCache.OptionsBase.sizeCalculation}
     */ sizeCalculation;
    /**
     * {@link LRUCache.OptionsBase.noDeleteOnFetchRejection}
     */ noDeleteOnFetchRejection;
    /**
     * {@link LRUCache.OptionsBase.noDeleteOnStaleGet}
     */ noDeleteOnStaleGet;
    /**
     * {@link LRUCache.OptionsBase.allowStaleOnFetchAbort}
     */ allowStaleOnFetchAbort;
    /**
     * {@link LRUCache.OptionsBase.allowStaleOnFetchRejection}
     */ allowStaleOnFetchRejection;
    /**
     * {@link LRUCache.OptionsBase.ignoreFetchAbort}
     */ ignoreFetchAbort;
    // computed properties
    #size;
    #calculatedSize;
    #keyMap;
    #keyList;
    #valList;
    #next;
    #prev;
    #head;
    #tail;
    #free;
    #disposed;
    #sizes;
    #starts;
    #ttls;
    #autopurgeTimers;
    #hasDispose;
    #hasFetchMethod;
    #hasDisposeAfter;
    #hasOnInsert;
    /**
     * Do not call this method unless you need to inspect the
     * inner workings of the cache.  If anything returned by this
     * object is modified in any way, strange breakage may occur.
     *
     * These fields are private for a reason!
     *
     * @internal
     */ static unsafeExposeInternals(c) {
        return {
            // properties
            starts: c.#starts,
            ttls: c.#ttls,
            autopurgeTimers: c.#autopurgeTimers,
            sizes: c.#sizes,
            keyMap: c.#keyMap,
            keyList: c.#keyList,
            valList: c.#valList,
            next: c.#next,
            prev: c.#prev,
            get head () {
                return c.#head;
            },
            get tail () {
                return c.#tail;
            },
            free: c.#free,
            // methods
            isBackgroundFetch: (p)=>c.#isBackgroundFetch(p),
            backgroundFetch: (k, index, options, context)=>c.#backgroundFetch(k, index, options, context),
            moveToTail: (index)=>c.#moveToTail(index),
            indexes: (options)=>c.#indexes(options),
            rindexes: (options)=>c.#rindexes(options),
            isStale: (index)=>c.#isStale(index)
        };
    }
    // Protected read-only members
    /**
     * {@link LRUCache.OptionsBase.max} (read-only)
     */ get max() {
        return this.#max;
    }
    /**
     * {@link LRUCache.OptionsBase.maxSize} (read-only)
     */ get maxSize() {
        return this.#maxSize;
    }
    /**
     * The total computed size of items in the cache (read-only)
     */ get calculatedSize() {
        return this.#calculatedSize;
    }
    /**
     * The number of items stored in the cache (read-only)
     */ get size() {
        return this.#size;
    }
    /**
     * {@link LRUCache.OptionsBase.fetchMethod} (read-only)
     */ get fetchMethod() {
        return this.#fetchMethod;
    }
    get memoMethod() {
        return this.#memoMethod;
    }
    /**
     * {@link LRUCache.OptionsBase.dispose} (read-only)
     */ get dispose() {
        return this.#dispose;
    }
    /**
     * {@link LRUCache.OptionsBase.onInsert} (read-only)
     */ get onInsert() {
        return this.#onInsert;
    }
    /**
     * {@link LRUCache.OptionsBase.disposeAfter} (read-only)
     */ get disposeAfter() {
        return this.#disposeAfter;
    }
    constructor(options){
        const { max = 0, ttl, ttlResolution = 1, ttlAutopurge, updateAgeOnGet, updateAgeOnHas, allowStale, dispose, onInsert, disposeAfter, noDisposeOnSet, noUpdateTTL, maxSize = 0, maxEntrySize = 0, sizeCalculation, fetchMethod, memoMethod, noDeleteOnFetchRejection, noDeleteOnStaleGet, allowStaleOnFetchRejection, allowStaleOnFetchAbort, ignoreFetchAbort, perf } = options;
        if (perf !== undefined) {
            if (typeof perf?.now !== 'function') {
                throw new TypeError('perf option must have a now() method if specified');
            }
        }
        this.#perf = perf ?? defaultPerf;
        if (max !== 0 && !isPosInt(max)) {
            throw new TypeError('max option must be a nonnegative integer');
        }
        const UintArray = max ? getUintArray(max) : Array;
        if (!UintArray) {
            throw new Error('invalid max value: ' + max);
        }
        this.#max = max;
        this.#maxSize = maxSize;
        this.maxEntrySize = maxEntrySize || this.#maxSize;
        this.sizeCalculation = sizeCalculation;
        if (this.sizeCalculation) {
            if (!this.#maxSize && !this.maxEntrySize) {
                throw new TypeError('cannot set sizeCalculation without setting maxSize or maxEntrySize');
            }
            if (typeof this.sizeCalculation !== 'function') {
                throw new TypeError('sizeCalculation set to non-function');
            }
        }
        if (memoMethod !== undefined && typeof memoMethod !== 'function') {
            throw new TypeError('memoMethod must be a function if defined');
        }
        this.#memoMethod = memoMethod;
        if (fetchMethod !== undefined && typeof fetchMethod !== 'function') {
            throw new TypeError('fetchMethod must be a function if specified');
        }
        this.#fetchMethod = fetchMethod;
        this.#hasFetchMethod = !!fetchMethod;
        this.#keyMap = new Map();
        this.#keyList = new Array(max).fill(undefined);
        this.#valList = new Array(max).fill(undefined);
        this.#next = new UintArray(max);
        this.#prev = new UintArray(max);
        this.#head = 0;
        this.#tail = 0;
        this.#free = Stack.create(max);
        this.#size = 0;
        this.#calculatedSize = 0;
        if (typeof dispose === 'function') {
            this.#dispose = dispose;
        }
        if (typeof onInsert === 'function') {
            this.#onInsert = onInsert;
        }
        if (typeof disposeAfter === 'function') {
            this.#disposeAfter = disposeAfter;
            this.#disposed = [];
        } else {
            this.#disposeAfter = undefined;
            this.#disposed = undefined;
        }
        this.#hasDispose = !!this.#dispose;
        this.#hasOnInsert = !!this.#onInsert;
        this.#hasDisposeAfter = !!this.#disposeAfter;
        this.noDisposeOnSet = !!noDisposeOnSet;
        this.noUpdateTTL = !!noUpdateTTL;
        this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
        this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
        this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
        this.ignoreFetchAbort = !!ignoreFetchAbort;
        // NB: maxEntrySize is set to maxSize if it's set
        if (this.maxEntrySize !== 0) {
            if (this.#maxSize !== 0) {
                if (!isPosInt(this.#maxSize)) {
                    throw new TypeError('maxSize must be a positive integer if specified');
                }
            }
            if (!isPosInt(this.maxEntrySize)) {
                throw new TypeError('maxEntrySize must be a positive integer if specified');
            }
            this.#initializeSizeTracking();
        }
        this.allowStale = !!allowStale;
        this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
        this.updateAgeOnGet = !!updateAgeOnGet;
        this.updateAgeOnHas = !!updateAgeOnHas;
        this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
        this.ttlAutopurge = !!ttlAutopurge;
        this.ttl = ttl || 0;
        if (this.ttl) {
            if (!isPosInt(this.ttl)) {
                throw new TypeError('ttl must be a positive integer if specified');
            }
            this.#initializeTTLTracking();
        }
        // do not allow completely unbounded caches
        if (this.#max === 0 && this.ttl === 0 && this.#maxSize === 0) {
            throw new TypeError('At least one of max, maxSize, or ttl is required');
        }
        if (!this.ttlAutopurge && !this.#max && !this.#maxSize) {
            const code = 'LRU_CACHE_UNBOUNDED';
            if (shouldWarn(code)) {
                warned.add(code);
                const msg = 'TTL caching without ttlAutopurge, max, or maxSize can ' + 'result in unbounded memory consumption.';
                emitWarning(msg, 'UnboundedCacheWarning', code, LRUCache);
            }
        }
    }
    /**
     * Return the number of ms left in the item's TTL. If item is not in cache,
     * returns `0`. Returns `Infinity` if item is in cache without a defined TTL.
     */ getRemainingTTL(key) {
        return this.#keyMap.has(key) ? Infinity : 0;
    }
    #initializeTTLTracking() {
        const ttls = new ZeroArray(this.#max);
        const starts = new ZeroArray(this.#max);
        this.#ttls = ttls;
        this.#starts = starts;
        const purgeTimers = this.ttlAutopurge ? new Array(this.#max) : undefined;
        this.#autopurgeTimers = purgeTimers;
        this.#setItemTTL = (index, ttl, start = this.#perf.now())=>{
            starts[index] = ttl !== 0 ? start : 0;
            ttls[index] = ttl;
            // clear out the purge timer if we're setting TTL to 0, and
            // previously had a ttl purge timer running, so it doesn't
            // fire unnecessarily.
            if (purgeTimers?.[index]) {
                clearTimeout(purgeTimers[index]);
                purgeTimers[index] = undefined;
            }
            if (ttl !== 0 && purgeTimers) {
                const t = setTimeout(()=>{
                    if (this.#isStale(index)) {
                        this.#delete(this.#keyList[index], 'expire');
                    }
                }, ttl + 1);
                // unref() not supported on all platforms
                /* c8 ignore start */ if (t.unref) {
                    t.unref();
                }
                /* c8 ignore stop */ purgeTimers[index] = t;
            }
        };
        this.#updateItemAge = (index)=>{
            starts[index] = ttls[index] !== 0 ? this.#perf.now() : 0;
        };
        this.#statusTTL = (status, index)=>{
            if (ttls[index]) {
                const ttl = ttls[index];
                const start = starts[index];
                /* c8 ignore next */ if (!ttl || !start) return;
                status.ttl = ttl;
                status.start = start;
                status.now = cachedNow || getNow();
                const age = status.now - start;
                status.remainingTTL = ttl - age;
            }
        };
        // debounce calls to perf.now() to 1s so we're not hitting
        // that costly call repeatedly.
        let cachedNow = 0;
        const getNow = ()=>{
            const n = this.#perf.now();
            if (this.ttlResolution > 0) {
                cachedNow = n;
                const t = setTimeout(()=>cachedNow = 0, this.ttlResolution);
                // not available on all platforms
                /* c8 ignore start */ if (t.unref) {
                    t.unref();
                }
            /* c8 ignore stop */ }
            return n;
        };
        this.getRemainingTTL = (key)=>{
            const index = this.#keyMap.get(key);
            if (index === undefined) {
                return 0;
            }
            const ttl = ttls[index];
            const start = starts[index];
            if (!ttl || !start) {
                return Infinity;
            }
            const age = (cachedNow || getNow()) - start;
            return ttl - age;
        };
        this.#isStale = (index)=>{
            const s = starts[index];
            const t = ttls[index];
            return !!t && !!s && (cachedNow || getNow()) - s > t;
        };
    }
    // conditionally set private methods related to TTL
    #updateItemAge = ()=>{};
    #statusTTL = ()=>{};
    #setItemTTL = ()=>{};
    /* c8 ignore stop */ #isStale = ()=>false;
    #initializeSizeTracking() {
        const sizes = new ZeroArray(this.#max);
        this.#calculatedSize = 0;
        this.#sizes = sizes;
        this.#removeItemSize = (index)=>{
            this.#calculatedSize -= sizes[index];
            sizes[index] = 0;
        };
        this.#requireSize = (k, v, size, sizeCalculation)=>{
            // provisionally accept background fetches.
            // actual value size will be checked when they return.
            if (this.#isBackgroundFetch(v)) {
                return 0;
            }
            if (!isPosInt(size)) {
                if (sizeCalculation) {
                    if (typeof sizeCalculation !== 'function') {
                        throw new TypeError('sizeCalculation must be a function');
                    }
                    size = sizeCalculation(v, k);
                    if (!isPosInt(size)) {
                        throw new TypeError('sizeCalculation return invalid (expect positive integer)');
                    }
                } else {
                    throw new TypeError('invalid size value (must be positive integer). ' + 'When maxSize or maxEntrySize is used, sizeCalculation ' + 'or size must be set.');
                }
            }
            return size;
        };
        this.#addItemSize = (index, size, status)=>{
            sizes[index] = size;
            if (this.#maxSize) {
                const maxSize = this.#maxSize - sizes[index];
                while(this.#calculatedSize > maxSize){
                    this.#evict(true);
                }
            }
            this.#calculatedSize += sizes[index];
            if (status) {
                status.entrySize = size;
                status.totalCalculatedSize = this.#calculatedSize;
            }
        };
    }
    #removeItemSize = (_i)=>{};
    #addItemSize = (_i, _s, _st)=>{};
    #requireSize = (_k, _v, size, sizeCalculation)=>{
        if (size || sizeCalculation) {
            throw new TypeError('cannot set size without setting maxSize or maxEntrySize on cache');
        }
        return 0;
    };
    *#indexes({ allowStale = this.allowStale } = {}) {
        if (this.#size) {
            for(let i = this.#tail; true;){
                if (!this.#isValidIndex(i)) {
                    break;
                }
                if (allowStale || !this.#isStale(i)) {
                    yield i;
                }
                if (i === this.#head) {
                    break;
                } else {
                    i = this.#prev[i];
                }
            }
        }
    }
    *#rindexes({ allowStale = this.allowStale } = {}) {
        if (this.#size) {
            for(let i = this.#head; true;){
                if (!this.#isValidIndex(i)) {
                    break;
                }
                if (allowStale || !this.#isStale(i)) {
                    yield i;
                }
                if (i === this.#tail) {
                    break;
                } else {
                    i = this.#next[i];
                }
            }
        }
    }
    #isValidIndex(index) {
        return index !== undefined && this.#keyMap.get(this.#keyList[index]) === index;
    }
    /**
     * Return a generator yielding `[key, value]` pairs,
     * in order from most recently used to least recently used.
     */ *entries() {
        for (const i of this.#indexes()){
            if (this.#valList[i] !== undefined && this.#keyList[i] !== undefined && !this.#isBackgroundFetch(this.#valList[i])) {
                yield [
                    this.#keyList[i],
                    this.#valList[i]
                ];
            }
        }
    }
    /**
     * Inverse order version of {@link LRUCache.entries}
     *
     * Return a generator yielding `[key, value]` pairs,
     * in order from least recently used to most recently used.
     */ *rentries() {
        for (const i of this.#rindexes()){
            if (this.#valList[i] !== undefined && this.#keyList[i] !== undefined && !this.#isBackgroundFetch(this.#valList[i])) {
                yield [
                    this.#keyList[i],
                    this.#valList[i]
                ];
            }
        }
    }
    /**
     * Return a generator yielding the keys in the cache,
     * in order from most recently used to least recently used.
     */ *keys() {
        for (const i of this.#indexes()){
            const k = this.#keyList[i];
            if (k !== undefined && !this.#isBackgroundFetch(this.#valList[i])) {
                yield k;
            }
        }
    }
    /**
     * Inverse order version of {@link LRUCache.keys}
     *
     * Return a generator yielding the keys in the cache,
     * in order from least recently used to most recently used.
     */ *rkeys() {
        for (const i of this.#rindexes()){
            const k = this.#keyList[i];
            if (k !== undefined && !this.#isBackgroundFetch(this.#valList[i])) {
                yield k;
            }
        }
    }
    /**
     * Return a generator yielding the values in the cache,
     * in order from most recently used to least recently used.
     */ *values() {
        for (const i of this.#indexes()){
            const v = this.#valList[i];
            if (v !== undefined && !this.#isBackgroundFetch(this.#valList[i])) {
                yield this.#valList[i];
            }
        }
    }
    /**
     * Inverse order version of {@link LRUCache.values}
     *
     * Return a generator yielding the values in the cache,
     * in order from least recently used to most recently used.
     */ *rvalues() {
        for (const i of this.#rindexes()){
            const v = this.#valList[i];
            if (v !== undefined && !this.#isBackgroundFetch(this.#valList[i])) {
                yield this.#valList[i];
            }
        }
    }
    /**
     * Iterating over the cache itself yields the same results as
     * {@link LRUCache.entries}
     */ [Symbol.iterator]() {
        return this.entries();
    }
    /**
     * A String value that is used in the creation of the default string
     * description of an object. Called by the built-in method
     * `Object.prototype.toString`.
     */ [Symbol.toStringTag] = 'LRUCache';
    /**
     * Find a value for which the supplied fn method returns a truthy value,
     * similar to `Array.find()`. fn is called as `fn(value, key, cache)`.
     */ find(fn, getOptions = {}) {
        for (const i of this.#indexes()){
            const v = this.#valList[i];
            const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
            if (value === undefined) continue;
            if (fn(value, this.#keyList[i], this)) {
                return this.get(this.#keyList[i], getOptions);
            }
        }
    }
    /**
     * Call the supplied function on each item in the cache, in order from most
     * recently used to least recently used.
     *
     * `fn` is called as `fn(value, key, cache)`.
     *
     * If `thisp` is provided, function will be called in the `this`-context of
     * the provided object, or the cache if no `thisp` object is provided.
     *
     * Does not update age or recenty of use, or iterate over stale values.
     */ forEach(fn, thisp = this) {
        for (const i of this.#indexes()){
            const v = this.#valList[i];
            const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
            if (value === undefined) continue;
            fn.call(thisp, value, this.#keyList[i], this);
        }
    }
    /**
     * The same as {@link LRUCache.forEach} but items are iterated over in
     * reverse order.  (ie, less recently used items are iterated over first.)
     */ rforEach(fn, thisp = this) {
        for (const i of this.#rindexes()){
            const v = this.#valList[i];
            const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
            if (value === undefined) continue;
            fn.call(thisp, value, this.#keyList[i], this);
        }
    }
    /**
     * Delete any stale entries. Returns true if anything was removed,
     * false otherwise.
     */ purgeStale() {
        let deleted = false;
        for (const i of this.#rindexes({
            allowStale: true
        })){
            if (this.#isStale(i)) {
                this.#delete(this.#keyList[i], 'expire');
                deleted = true;
            }
        }
        return deleted;
    }
    /**
     * Get the extended info about a given entry, to get its value, size, and
     * TTL info simultaneously. Returns `undefined` if the key is not present.
     *
     * Unlike {@link LRUCache#dump}, which is designed to be portable and survive
     * serialization, the `start` value is always the current timestamp, and the
     * `ttl` is a calculated remaining time to live (negative if expired).
     *
     * Always returns stale values, if their info is found in the cache, so be
     * sure to check for expirations (ie, a negative {@link LRUCache.Entry#ttl})
     * if relevant.
     */ info(key) {
        const i = this.#keyMap.get(key);
        if (i === undefined) return undefined;
        const v = this.#valList[i];
        /* c8 ignore start - this isn't tested for the info function,
         * but it's the same logic as found in other places. */ const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
        if (value === undefined) return undefined;
        /* c8 ignore end */ const entry = {
            value
        };
        if (this.#ttls && this.#starts) {
            const ttl = this.#ttls[i];
            const start = this.#starts[i];
            if (ttl && start) {
                const remain = ttl - (this.#perf.now() - start);
                entry.ttl = remain;
                entry.start = Date.now();
            }
        }
        if (this.#sizes) {
            entry.size = this.#sizes[i];
        }
        return entry;
    }
    /**
     * Return an array of [key, {@link LRUCache.Entry}] tuples which can be
     * passed to {@link LRUCache#load}.
     *
     * The `start` fields are calculated relative to a portable `Date.now()`
     * timestamp, even if `performance.now()` is available.
     *
     * Stale entries are always included in the `dump`, even if
     * {@link LRUCache.OptionsBase.allowStale} is false.
     *
     * Note: this returns an actual array, not a generator, so it can be more
     * easily passed around.
     */ dump() {
        const arr = [];
        for (const i of this.#indexes({
            allowStale: true
        })){
            const key = this.#keyList[i];
            const v = this.#valList[i];
            const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
            if (value === undefined || key === undefined) continue;
            const entry = {
                value
            };
            if (this.#ttls && this.#starts) {
                entry.ttl = this.#ttls[i];
                // always dump the start relative to a portable timestamp
                // it's ok for this to be a bit slow, it's a rare operation.
                const age = this.#perf.now() - this.#starts[i];
                entry.start = Math.floor(Date.now() - age);
            }
            if (this.#sizes) {
                entry.size = this.#sizes[i];
            }
            arr.unshift([
                key,
                entry
            ]);
        }
        return arr;
    }
    /**
     * Reset the cache and load in the items in entries in the order listed.
     *
     * The shape of the resulting cache may be different if the same options are
     * not used in both caches.
     *
     * The `start` fields are assumed to be calculated relative to a portable
     * `Date.now()` timestamp, even if `performance.now()` is available.
     */ load(arr) {
        this.clear();
        for (const [key, entry] of arr){
            if (entry.start) {
                // entry.start is a portable timestamp, but we may be using
                // node's performance.now(), so calculate the offset, so that
                // we get the intended remaining TTL, no matter how long it's
                // been on ice.
                //
                // it's ok for this to be a bit slow, it's a rare operation.
                const age = Date.now() - entry.start;
                entry.start = this.#perf.now() - age;
            }
            this.set(key, entry.value, entry);
        }
    }
    /**
     * Add a value to the cache.
     *
     * Note: if `undefined` is specified as a value, this is an alias for
     * {@link LRUCache#delete}
     *
     * Fields on the {@link LRUCache.SetOptions} options param will override
     * their corresponding values in the constructor options for the scope
     * of this single `set()` operation.
     *
     * If `start` is provided, then that will set the effective start
     * time for the TTL calculation. Note that this must be a previous
     * value of `performance.now()` if supported, or a previous value of
     * `Date.now()` if not.
     *
     * Options object may also include `size`, which will prevent
     * calling the `sizeCalculation` function and just use the specified
     * number if it is a positive integer, and `noDisposeOnSet` which
     * will prevent calling a `dispose` function in the case of
     * overwrites.
     *
     * If the `size` (or return value of `sizeCalculation`) for a given
     * entry is greater than `maxEntrySize`, then the item will not be
     * added to the cache.
     *
     * Will update the recency of the entry.
     *
     * If the value is `undefined`, then this is an alias for
     * `cache.delete(key)`. `undefined` is never stored in the cache.
     */ set(k, v, setOptions = {}) {
        if (v === undefined) {
            this.delete(k);
            return this;
        }
        const { ttl = this.ttl, start, noDisposeOnSet = this.noDisposeOnSet, sizeCalculation = this.sizeCalculation, status } = setOptions;
        let { noUpdateTTL = this.noUpdateTTL } = setOptions;
        const size = this.#requireSize(k, v, setOptions.size || 0, sizeCalculation);
        // if the item doesn't fit, don't do anything
        // NB: maxEntrySize set to maxSize by default
        if (this.maxEntrySize && size > this.maxEntrySize) {
            if (status) {
                status.set = 'miss';
                status.maxEntrySizeExceeded = true;
            }
            // have to delete, in case something is there already.
            this.#delete(k, 'set');
            return this;
        }
        let index = this.#size === 0 ? undefined : this.#keyMap.get(k);
        if (index === undefined) {
            // addition
            index = this.#size === 0 ? this.#tail : this.#free.length !== 0 ? this.#free.pop() : this.#size === this.#max ? this.#evict(false) : this.#size;
            this.#keyList[index] = k;
            this.#valList[index] = v;
            this.#keyMap.set(k, index);
            this.#next[this.#tail] = index;
            this.#prev[index] = this.#tail;
            this.#tail = index;
            this.#size++;
            this.#addItemSize(index, size, status);
            if (status) status.set = 'add';
            noUpdateTTL = false;
            if (this.#hasOnInsert) {
                this.#onInsert?.(v, k, 'add');
            }
        } else {
            // update
            this.#moveToTail(index);
            const oldVal = this.#valList[index];
            if (v !== oldVal) {
                if (this.#hasFetchMethod && this.#isBackgroundFetch(oldVal)) {
                    oldVal.__abortController.abort(new Error('replaced'));
                    const { __staleWhileFetching: s } = oldVal;
                    if (s !== undefined && !noDisposeOnSet) {
                        if (this.#hasDispose) {
                            this.#dispose?.(s, k, 'set');
                        }
                        if (this.#hasDisposeAfter) {
                            this.#disposed?.push([
                                s,
                                k,
                                'set'
                            ]);
                        }
                    }
                } else if (!noDisposeOnSet) {
                    if (this.#hasDispose) {
                        this.#dispose?.(oldVal, k, 'set');
                    }
                    if (this.#hasDisposeAfter) {
                        this.#disposed?.push([
                            oldVal,
                            k,
                            'set'
                        ]);
                    }
                }
                this.#removeItemSize(index);
                this.#addItemSize(index, size, status);
                this.#valList[index] = v;
                if (status) {
                    status.set = 'replace';
                    const oldValue = oldVal && this.#isBackgroundFetch(oldVal) ? oldVal.__staleWhileFetching : oldVal;
                    if (oldValue !== undefined) status.oldValue = oldValue;
                }
            } else if (status) {
                status.set = 'update';
            }
            if (this.#hasOnInsert) {
                this.onInsert?.(v, k, v === oldVal ? 'update' : 'replace');
            }
        }
        if (ttl !== 0 && !this.#ttls) {
            this.#initializeTTLTracking();
        }
        if (this.#ttls) {
            if (!noUpdateTTL) {
                this.#setItemTTL(index, ttl, start);
            }
            if (status) this.#statusTTL(status, index);
        }
        if (!noDisposeOnSet && this.#hasDisposeAfter && this.#disposed) {
            const dt = this.#disposed;
            let task;
            while(task = dt?.shift()){
                this.#disposeAfter?.(...task);
            }
        }
        return this;
    }
    /**
     * Evict the least recently used item, returning its value or
     * `undefined` if cache is empty.
     */ pop() {
        try {
            while(this.#size){
                const val = this.#valList[this.#head];
                this.#evict(true);
                if (this.#isBackgroundFetch(val)) {
                    if (val.__staleWhileFetching) {
                        return val.__staleWhileFetching;
                    }
                } else if (val !== undefined) {
                    return val;
                }
            }
        } finally{
            if (this.#hasDisposeAfter && this.#disposed) {
                const dt = this.#disposed;
                let task;
                while(task = dt?.shift()){
                    this.#disposeAfter?.(...task);
                }
            }
        }
    }
    #evict(free) {
        const head = this.#head;
        const k = this.#keyList[head];
        const v = this.#valList[head];
        if (this.#hasFetchMethod && this.#isBackgroundFetch(v)) {
            v.__abortController.abort(new Error('evicted'));
        } else if (this.#hasDispose || this.#hasDisposeAfter) {
            if (this.#hasDispose) {
                this.#dispose?.(v, k, 'evict');
            }
            if (this.#hasDisposeAfter) {
                this.#disposed?.push([
                    v,
                    k,
                    'evict'
                ]);
            }
        }
        this.#removeItemSize(head);
        if (this.#autopurgeTimers?.[head]) {
            clearTimeout(this.#autopurgeTimers[head]);
            this.#autopurgeTimers[head] = undefined;
        }
        // if we aren't about to use the index, then null these out
        if (free) {
            this.#keyList[head] = undefined;
            this.#valList[head] = undefined;
            this.#free.push(head);
        }
        if (this.#size === 1) {
            this.#head = this.#tail = 0;
            this.#free.length = 0;
        } else {
            this.#head = this.#next[head];
        }
        this.#keyMap.delete(k);
        this.#size--;
        return head;
    }
    /**
     * Check if a key is in the cache, without updating the recency of use.
     * Will return false if the item is stale, even though it is technically
     * in the cache.
     *
     * Check if a key is in the cache, without updating the recency of
     * use. Age is updated if {@link LRUCache.OptionsBase.updateAgeOnHas} is set
     * to `true` in either the options or the constructor.
     *
     * Will return `false` if the item is stale, even though it is technically in
     * the cache. The difference can be determined (if it matters) by using a
     * `status` argument, and inspecting the `has` field.
     *
     * Will not update item age unless
     * {@link LRUCache.OptionsBase.updateAgeOnHas} is set.
     */ has(k, hasOptions = {}) {
        const { updateAgeOnHas = this.updateAgeOnHas, status } = hasOptions;
        const index = this.#keyMap.get(k);
        if (index !== undefined) {
            const v = this.#valList[index];
            if (this.#isBackgroundFetch(v) && v.__staleWhileFetching === undefined) {
                return false;
            }
            if (!this.#isStale(index)) {
                if (updateAgeOnHas) {
                    this.#updateItemAge(index);
                }
                if (status) {
                    status.has = 'hit';
                    this.#statusTTL(status, index);
                }
                return true;
            } else if (status) {
                status.has = 'stale';
                this.#statusTTL(status, index);
            }
        } else if (status) {
            status.has = 'miss';
        }
        return false;
    }
    /**
     * Like {@link LRUCache#get} but doesn't update recency or delete stale
     * items.
     *
     * Returns `undefined` if the item is stale, unless
     * {@link LRUCache.OptionsBase.allowStale} is set.
     */ peek(k, peekOptions = {}) {
        const { allowStale = this.allowStale } = peekOptions;
        const index = this.#keyMap.get(k);
        if (index === undefined || !allowStale && this.#isStale(index)) {
            return;
        }
        const v = this.#valList[index];
        // either stale and allowed, or forcing a refresh of non-stale value
        return this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
    }
    #backgroundFetch(k, index, options, context) {
        const v = index === undefined ? undefined : this.#valList[index];
        if (this.#isBackgroundFetch(v)) {
            return v;
        }
        const ac = new AC();
        const { signal } = options;
        // when/if our AC signals, then stop listening to theirs.
        signal?.addEventListener('abort', ()=>ac.abort(signal.reason), {
            signal: ac.signal
        });
        const fetchOpts = {
            signal: ac.signal,
            options,
            context
        };
        const cb = (v, updateCache = false)=>{
            const { aborted } = ac.signal;
            const ignoreAbort = options.ignoreFetchAbort && v !== undefined;
            if (options.status) {
                if (aborted && !updateCache) {
                    options.status.fetchAborted = true;
                    options.status.fetchError = ac.signal.reason;
                    if (ignoreAbort) options.status.fetchAbortIgnored = true;
                } else {
                    options.status.fetchResolved = true;
                }
            }
            if (aborted && !ignoreAbort && !updateCache) {
                return fetchFail(ac.signal.reason);
            }
            // either we didn't abort, and are still here, or we did, and ignored
            const bf = p;
            // if nothing else has been written there but we're set to update the
            // cache and ignore the abort, or if it's still pending on this specific
            // background request, then write it to the cache.
            const vl = this.#valList[index];
            if (vl === p || ignoreAbort && updateCache && vl === undefined) {
                if (v === undefined) {
                    if (bf.__staleWhileFetching !== undefined) {
                        this.#valList[index] = bf.__staleWhileFetching;
                    } else {
                        this.#delete(k, 'fetch');
                    }
                } else {
                    if (options.status) options.status.fetchUpdated = true;
                    this.set(k, v, fetchOpts.options);
                }
            }
            return v;
        };
        const eb = (er)=>{
            if (options.status) {
                options.status.fetchRejected = true;
                options.status.fetchError = er;
            }
            return fetchFail(er);
        };
        const fetchFail = (er)=>{
            const { aborted } = ac.signal;
            const allowStaleAborted = aborted && options.allowStaleOnFetchAbort;
            const allowStale = allowStaleAborted || options.allowStaleOnFetchRejection;
            const noDelete = allowStale || options.noDeleteOnFetchRejection;
            const bf = p;
            if (this.#valList[index] === p) {
                // if we allow stale on fetch rejections, then we need to ensure that
                // the stale value is not removed from the cache when the fetch fails.
                const del = !noDelete || bf.__staleWhileFetching === undefined;
                if (del) {
                    this.#delete(k, 'fetch');
                } else if (!allowStaleAborted) {
                    // still replace the *promise* with the stale value,
                    // since we are done with the promise at this point.
                    // leave it untouched if we're still waiting for an
                    // aborted background fetch that hasn't yet returned.
                    this.#valList[index] = bf.__staleWhileFetching;
                }
            }
            if (allowStale) {
                if (options.status && bf.__staleWhileFetching !== undefined) {
                    options.status.returnedStale = true;
                }
                return bf.__staleWhileFetching;
            } else if (bf.__returned === bf) {
                throw er;
            }
        };
        const pcall = (res, rej)=>{
            const fmp = this.#fetchMethod?.(k, v, fetchOpts);
            if (fmp && fmp instanceof Promise) {
                fmp.then((v)=>res(v === undefined ? undefined : v), rej);
            }
            // ignored, we go until we finish, regardless.
            // defer check until we are actually aborting,
            // so fetchMethod can override.
            ac.signal.addEventListener('abort', ()=>{
                if (!options.ignoreFetchAbort || options.allowStaleOnFetchAbort) {
                    res(undefined);
                    // when it eventually resolves, update the cache.
                    if (options.allowStaleOnFetchAbort) {
                        res = (v)=>cb(v, true);
                    }
                }
            });
        };
        if (options.status) options.status.fetchDispatched = true;
        const p = new Promise(pcall).then(cb, eb);
        const bf = Object.assign(p, {
            __abortController: ac,
            __staleWhileFetching: v,
            __returned: undefined
        });
        if (index === undefined) {
            // internal, don't expose status.
            this.set(k, bf, {
                ...fetchOpts.options,
                status: undefined
            });
            index = this.#keyMap.get(k);
        } else {
            this.#valList[index] = bf;
        }
        return bf;
    }
    #isBackgroundFetch(p) {
        if (!this.#hasFetchMethod) return false;
        const b = p;
        return !!b && b instanceof Promise && b.hasOwnProperty('__staleWhileFetching') && b.__abortController instanceof AC;
    }
    async fetch(k, fetchOptions = {}) {
        const { // get options
        allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, // set options
        ttl = this.ttl, noDisposeOnSet = this.noDisposeOnSet, size = 0, sizeCalculation = this.sizeCalculation, noUpdateTTL = this.noUpdateTTL, // fetch exclusive options
        noDeleteOnFetchRejection = this.noDeleteOnFetchRejection, allowStaleOnFetchRejection = this.allowStaleOnFetchRejection, ignoreFetchAbort = this.ignoreFetchAbort, allowStaleOnFetchAbort = this.allowStaleOnFetchAbort, context, forceRefresh = false, status, signal } = fetchOptions;
        if (!this.#hasFetchMethod) {
            if (status) status.fetch = 'get';
            return this.get(k, {
                allowStale,
                updateAgeOnGet,
                noDeleteOnStaleGet,
                status
            });
        }
        const options = {
            allowStale,
            updateAgeOnGet,
            noDeleteOnStaleGet,
            ttl,
            noDisposeOnSet,
            size,
            sizeCalculation,
            noUpdateTTL,
            noDeleteOnFetchRejection,
            allowStaleOnFetchRejection,
            allowStaleOnFetchAbort,
            ignoreFetchAbort,
            status,
            signal
        };
        let index = this.#keyMap.get(k);
        if (index === undefined) {
            if (status) status.fetch = 'miss';
            const p = this.#backgroundFetch(k, index, options, context);
            return p.__returned = p;
        } else {
            // in cache, maybe already fetching
            const v = this.#valList[index];
            if (this.#isBackgroundFetch(v)) {
                const stale = allowStale && v.__staleWhileFetching !== undefined;
                if (status) {
                    status.fetch = 'inflight';
                    if (stale) status.returnedStale = true;
                }
                return stale ? v.__staleWhileFetching : v.__returned = v;
            }
            // if we force a refresh, that means do NOT serve the cached value,
            // unless we are already in the process of refreshing the cache.
            const isStale = this.#isStale(index);
            if (!forceRefresh && !isStale) {
                if (status) status.fetch = 'hit';
                this.#moveToTail(index);
                if (updateAgeOnGet) {
                    this.#updateItemAge(index);
                }
                if (status) this.#statusTTL(status, index);
                return v;
            }
            // ok, it is stale or a forced refresh, and not already fetching.
            // refresh the cache.
            const p = this.#backgroundFetch(k, index, options, context);
            const hasStale = p.__staleWhileFetching !== undefined;
            const staleVal = hasStale && allowStale;
            if (status) {
                status.fetch = isStale ? 'stale' : 'refresh';
                if (staleVal && isStale) status.returnedStale = true;
            }
            return staleVal ? p.__staleWhileFetching : p.__returned = p;
        }
    }
    async forceFetch(k, fetchOptions = {}) {
        const v = await this.fetch(k, fetchOptions);
        if (v === undefined) throw new Error('fetch() returned undefined');
        return v;
    }
    memo(k, memoOptions = {}) {
        const memoMethod = this.#memoMethod;
        if (!memoMethod) {
            throw new Error('no memoMethod provided to constructor');
        }
        const { context, forceRefresh, ...options } = memoOptions;
        const v = this.get(k, options);
        if (!forceRefresh && v !== undefined) return v;
        const vv = memoMethod(k, v, {
            options,
            context
        });
        this.set(k, vv, options);
        return vv;
    }
    /**
     * Return a value from the cache. Will update the recency of the cache
     * entry found.
     *
     * If the key is not found, get() will return `undefined`.
     */ get(k, getOptions = {}) {
        const { allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, status } = getOptions;
        const index = this.#keyMap.get(k);
        if (index !== undefined) {
            const value = this.#valList[index];
            const fetching = this.#isBackgroundFetch(value);
            if (status) this.#statusTTL(status, index);
            if (this.#isStale(index)) {
                if (status) status.get = 'stale';
                // delete only if not an in-flight background fetch
                if (!fetching) {
                    if (!noDeleteOnStaleGet) {
                        this.#delete(k, 'expire');
                    }
                    if (status && allowStale) status.returnedStale = true;
                    return allowStale ? value : undefined;
                } else {
                    if (status && allowStale && value.__staleWhileFetching !== undefined) {
                        status.returnedStale = true;
                    }
                    return allowStale ? value.__staleWhileFetching : undefined;
                }
            } else {
                if (status) status.get = 'hit';
                // if we're currently fetching it, we don't actually have it yet
                // it's not stale, which means this isn't a staleWhileRefetching.
                // If it's not stale, and fetching, AND has a __staleWhileFetching
                // value, then that means the user fetched with {forceRefresh:true},
                // so it's safe to return that value.
                if (fetching) {
                    return value.__staleWhileFetching;
                }
                this.#moveToTail(index);
                if (updateAgeOnGet) {
                    this.#updateItemAge(index);
                }
                return value;
            }
        } else if (status) {
            status.get = 'miss';
        }
    }
    #connect(p, n) {
        this.#prev[n] = p;
        this.#next[p] = n;
    }
    #moveToTail(index) {
        // if tail already, nothing to do
        // if head, move head to next[index]
        // else
        //   move next[prev[index]] to next[index] (head has no prev)
        //   move prev[next[index]] to prev[index]
        // prev[index] = tail
        // next[tail] = index
        // tail = index
        if (index !== this.#tail) {
            if (index === this.#head) {
                this.#head = this.#next[index];
            } else {
                this.#connect(this.#prev[index], this.#next[index]);
            }
            this.#connect(this.#tail, index);
            this.#tail = index;
        }
    }
    /**
     * Deletes a key out of the cache.
     *
     * Returns true if the key was deleted, false otherwise.
     */ delete(k) {
        return this.#delete(k, 'delete');
    }
    #delete(k, reason) {
        let deleted = false;
        if (this.#size !== 0) {
            const index = this.#keyMap.get(k);
            if (index !== undefined) {
                if (this.#autopurgeTimers?.[index]) {
                    clearTimeout(this.#autopurgeTimers?.[index]);
                    this.#autopurgeTimers[index] = undefined;
                }
                deleted = true;
                if (this.#size === 1) {
                    this.#clear(reason);
                } else {
                    this.#removeItemSize(index);
                    const v = this.#valList[index];
                    if (this.#isBackgroundFetch(v)) {
                        v.__abortController.abort(new Error('deleted'));
                    } else if (this.#hasDispose || this.#hasDisposeAfter) {
                        if (this.#hasDispose) {
                            this.#dispose?.(v, k, reason);
                        }
                        if (this.#hasDisposeAfter) {
                            this.#disposed?.push([
                                v,
                                k,
                                reason
                            ]);
                        }
                    }
                    this.#keyMap.delete(k);
                    this.#keyList[index] = undefined;
                    this.#valList[index] = undefined;
                    if (index === this.#tail) {
                        this.#tail = this.#prev[index];
                    } else if (index === this.#head) {
                        this.#head = this.#next[index];
                    } else {
                        const pi = this.#prev[index];
                        this.#next[pi] = this.#next[index];
                        const ni = this.#next[index];
                        this.#prev[ni] = this.#prev[index];
                    }
                    this.#size--;
                    this.#free.push(index);
                }
            }
        }
        if (this.#hasDisposeAfter && this.#disposed?.length) {
            const dt = this.#disposed;
            let task;
            while(task = dt?.shift()){
                this.#disposeAfter?.(...task);
            }
        }
        return deleted;
    }
    /**
     * Clear the cache entirely, throwing away all values.
     */ clear() {
        return this.#clear('delete');
    }
    #clear(reason) {
        for (const index of this.#rindexes({
            allowStale: true
        })){
            const v = this.#valList[index];
            if (this.#isBackgroundFetch(v)) {
                v.__abortController.abort(new Error('deleted'));
            } else {
                const k = this.#keyList[index];
                if (this.#hasDispose) {
                    this.#dispose?.(v, k, reason);
                }
                if (this.#hasDisposeAfter) {
                    this.#disposed?.push([
                        v,
                        k,
                        reason
                    ]);
                }
            }
        }
        this.#keyMap.clear();
        this.#valList.fill(undefined);
        this.#keyList.fill(undefined);
        if (this.#ttls && this.#starts) {
            this.#ttls.fill(0);
            this.#starts.fill(0);
            for (const t of this.#autopurgeTimers ?? []){
                if (t !== undefined) clearTimeout(t);
            }
            this.#autopurgeTimers?.fill(undefined);
        }
        if (this.#sizes) {
            this.#sizes.fill(0);
        }
        this.#head = 0;
        this.#tail = 0;
        this.#free.length = 0;
        this.#calculatedSize = 0;
        this.#size = 0;
        if (this.#hasDisposeAfter && this.#disposed) {
            const dt = this.#disposed;
            let task;
            while(task = dt?.shift()){
                this.#disposeAfter?.(...task);
            }
        }
    }
}
exports.LRUCache = LRUCache; //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/@apollo/server/node_modules/lru-cache/dist/commonjs/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @module LRUCache
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LRUCache = void 0;
const defaultPerf = typeof performance === 'object' && performance && typeof performance.now === 'function' ? performance : Date;
const warned = new Set();
/* c8 ignore start */ const PROCESS = typeof process === 'object' && !!process ? process : {};
/* c8 ignore start */ const emitWarning = (msg, type, code, fn)=>{
    typeof PROCESS.emitWarning === 'function' ? PROCESS.emitWarning(msg, type, code, fn) : console.error(`[${code}] ${type}: ${msg}`);
};
let AC = globalThis.AbortController;
let AS = globalThis.AbortSignal;
/* c8 ignore start */ if (typeof AC === 'undefined') {
    //@ts-ignore
    AS = class AbortSignal {
        onabort;
        _onabort = [];
        reason;
        aborted = false;
        addEventListener(_, fn) {
            this._onabort.push(fn);
        }
    };
    //@ts-ignore
    AC = class AbortController {
        constructor(){
            warnACPolyfill();
        }
        signal = new AS();
        abort(reason) {
            if (this.signal.aborted) return;
            //@ts-ignore
            this.signal.reason = reason;
            //@ts-ignore
            this.signal.aborted = true;
            //@ts-ignore
            for (const fn of this.signal._onabort){
                fn(reason);
            }
            this.signal.onabort?.(reason);
        }
    };
    let printACPolyfillWarning = PROCESS.env?.LRU_CACHE_IGNORE_AC_WARNING !== '1';
    const warnACPolyfill = ()=>{
        if (!printACPolyfillWarning) return;
        printACPolyfillWarning = false;
        emitWarning('AbortController is not defined. If using lru-cache in ' + 'node 14, load an AbortController polyfill from the ' + '`node-abort-controller` package. A minimal polyfill is ' + 'provided for use by LRUCache.fetch(), but it should not be ' + 'relied upon in other contexts (eg, passing it to other APIs that ' + 'use AbortController/AbortSignal might have undesirable effects). ' + 'You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.', 'NO_ABORT_CONTROLLER', 'ENOTSUP', warnACPolyfill);
    };
}
/* c8 ignore stop */ const shouldWarn = (code)=>!warned.has(code);
const TYPE = Symbol('type');
const isPosInt = (n)=>n && n === Math.floor(n) && n > 0 && isFinite(n);
/* c8 ignore start */ // This is a little bit ridiculous, tbh.
// The maximum array length is 2^32-1 or thereabouts on most JS impls.
// And well before that point, you're caching the entire world, I mean,
// that's ~32GB of just integers for the next/prev links, plus whatever
// else to hold that many keys and values.  Just filling the memory with
// zeroes at init time is brutal when you get that big.
// But why not be complete?
// Maybe in the future, these limits will have expanded.
const getUintArray = (max)=>!isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;
/* c8 ignore stop */ class ZeroArray extends Array {
    constructor(size){
        super(size);
        this.fill(0);
    }
}
class Stack {
    heap;
    length;
    // private constructor
    static #constructing = false;
    static create(max) {
        const HeapCls = getUintArray(max);
        if (!HeapCls) return [];
        Stack.#constructing = true;
        const s = new Stack(max, HeapCls);
        Stack.#constructing = false;
        return s;
    }
    constructor(max, HeapCls){
        /* c8 ignore start */ if (!Stack.#constructing) {
            throw new TypeError('instantiate Stack using Stack.create(n)');
        }
        /* c8 ignore stop */ this.heap = new HeapCls(max);
        this.length = 0;
    }
    push(n) {
        this.heap[this.length++] = n;
    }
    pop() {
        return this.heap[--this.length];
    }
}
/**
 * Default export, the thing you're using this module to get.
 *
 * The `K` and `V` types define the key and value types, respectively. The
 * optional `FC` type defines the type of the `context` object passed to
 * `cache.fetch()` and `cache.memo()`.
 *
 * Keys and values **must not** be `null` or `undefined`.
 *
 * All properties from the options object (with the exception of `max`,
 * `maxSize`, `fetchMethod`, `memoMethod`, `dispose` and `disposeAfter`) are
 * added as normal public members. (The listed options are read-only getters.)
 *
 * Changing any of these will alter the defaults for subsequent method calls.
 */ class LRUCache {
    // options that cannot be changed without disaster
    #max;
    #maxSize;
    #dispose;
    #onInsert;
    #disposeAfter;
    #fetchMethod;
    #memoMethod;
    #perf;
    /**
     * {@link LRUCache.OptionsBase.perf}
     */ get perf() {
        return this.#perf;
    }
    /**
     * {@link LRUCache.OptionsBase.ttl}
     */ ttl;
    /**
     * {@link LRUCache.OptionsBase.ttlResolution}
     */ ttlResolution;
    /**
     * {@link LRUCache.OptionsBase.ttlAutopurge}
     */ ttlAutopurge;
    /**
     * {@link LRUCache.OptionsBase.updateAgeOnGet}
     */ updateAgeOnGet;
    /**
     * {@link LRUCache.OptionsBase.updateAgeOnHas}
     */ updateAgeOnHas;
    /**
     * {@link LRUCache.OptionsBase.allowStale}
     */ allowStale;
    /**
     * {@link LRUCache.OptionsBase.noDisposeOnSet}
     */ noDisposeOnSet;
    /**
     * {@link LRUCache.OptionsBase.noUpdateTTL}
     */ noUpdateTTL;
    /**
     * {@link LRUCache.OptionsBase.maxEntrySize}
     */ maxEntrySize;
    /**
     * {@link LRUCache.OptionsBase.sizeCalculation}
     */ sizeCalculation;
    /**
     * {@link LRUCache.OptionsBase.noDeleteOnFetchRejection}
     */ noDeleteOnFetchRejection;
    /**
     * {@link LRUCache.OptionsBase.noDeleteOnStaleGet}
     */ noDeleteOnStaleGet;
    /**
     * {@link LRUCache.OptionsBase.allowStaleOnFetchAbort}
     */ allowStaleOnFetchAbort;
    /**
     * {@link LRUCache.OptionsBase.allowStaleOnFetchRejection}
     */ allowStaleOnFetchRejection;
    /**
     * {@link LRUCache.OptionsBase.ignoreFetchAbort}
     */ ignoreFetchAbort;
    // computed properties
    #size;
    #calculatedSize;
    #keyMap;
    #keyList;
    #valList;
    #next;
    #prev;
    #head;
    #tail;
    #free;
    #disposed;
    #sizes;
    #starts;
    #ttls;
    #autopurgeTimers;
    #hasDispose;
    #hasFetchMethod;
    #hasDisposeAfter;
    #hasOnInsert;
    /**
     * Do not call this method unless you need to inspect the
     * inner workings of the cache.  If anything returned by this
     * object is modified in any way, strange breakage may occur.
     *
     * These fields are private for a reason!
     *
     * @internal
     */ static unsafeExposeInternals(c) {
        return {
            // properties
            starts: c.#starts,
            ttls: c.#ttls,
            autopurgeTimers: c.#autopurgeTimers,
            sizes: c.#sizes,
            keyMap: c.#keyMap,
            keyList: c.#keyList,
            valList: c.#valList,
            next: c.#next,
            prev: c.#prev,
            get head () {
                return c.#head;
            },
            get tail () {
                return c.#tail;
            },
            free: c.#free,
            // methods
            isBackgroundFetch: (p)=>c.#isBackgroundFetch(p),
            backgroundFetch: (k, index, options, context)=>c.#backgroundFetch(k, index, options, context),
            moveToTail: (index)=>c.#moveToTail(index),
            indexes: (options)=>c.#indexes(options),
            rindexes: (options)=>c.#rindexes(options),
            isStale: (index)=>c.#isStale(index)
        };
    }
    // Protected read-only members
    /**
     * {@link LRUCache.OptionsBase.max} (read-only)
     */ get max() {
        return this.#max;
    }
    /**
     * {@link LRUCache.OptionsBase.maxSize} (read-only)
     */ get maxSize() {
        return this.#maxSize;
    }
    /**
     * The total computed size of items in the cache (read-only)
     */ get calculatedSize() {
        return this.#calculatedSize;
    }
    /**
     * The number of items stored in the cache (read-only)
     */ get size() {
        return this.#size;
    }
    /**
     * {@link LRUCache.OptionsBase.fetchMethod} (read-only)
     */ get fetchMethod() {
        return this.#fetchMethod;
    }
    get memoMethod() {
        return this.#memoMethod;
    }
    /**
     * {@link LRUCache.OptionsBase.dispose} (read-only)
     */ get dispose() {
        return this.#dispose;
    }
    /**
     * {@link LRUCache.OptionsBase.onInsert} (read-only)
     */ get onInsert() {
        return this.#onInsert;
    }
    /**
     * {@link LRUCache.OptionsBase.disposeAfter} (read-only)
     */ get disposeAfter() {
        return this.#disposeAfter;
    }
    constructor(options){
        const { max = 0, ttl, ttlResolution = 1, ttlAutopurge, updateAgeOnGet, updateAgeOnHas, allowStale, dispose, onInsert, disposeAfter, noDisposeOnSet, noUpdateTTL, maxSize = 0, maxEntrySize = 0, sizeCalculation, fetchMethod, memoMethod, noDeleteOnFetchRejection, noDeleteOnStaleGet, allowStaleOnFetchRejection, allowStaleOnFetchAbort, ignoreFetchAbort, perf } = options;
        if (perf !== undefined) {
            if (typeof perf?.now !== 'function') {
                throw new TypeError('perf option must have a now() method if specified');
            }
        }
        this.#perf = perf ?? defaultPerf;
        if (max !== 0 && !isPosInt(max)) {
            throw new TypeError('max option must be a nonnegative integer');
        }
        const UintArray = max ? getUintArray(max) : Array;
        if (!UintArray) {
            throw new Error('invalid max value: ' + max);
        }
        this.#max = max;
        this.#maxSize = maxSize;
        this.maxEntrySize = maxEntrySize || this.#maxSize;
        this.sizeCalculation = sizeCalculation;
        if (this.sizeCalculation) {
            if (!this.#maxSize && !this.maxEntrySize) {
                throw new TypeError('cannot set sizeCalculation without setting maxSize or maxEntrySize');
            }
            if (typeof this.sizeCalculation !== 'function') {
                throw new TypeError('sizeCalculation set to non-function');
            }
        }
        if (memoMethod !== undefined && typeof memoMethod !== 'function') {
            throw new TypeError('memoMethod must be a function if defined');
        }
        this.#memoMethod = memoMethod;
        if (fetchMethod !== undefined && typeof fetchMethod !== 'function') {
            throw new TypeError('fetchMethod must be a function if specified');
        }
        this.#fetchMethod = fetchMethod;
        this.#hasFetchMethod = !!fetchMethod;
        this.#keyMap = new Map();
        this.#keyList = new Array(max).fill(undefined);
        this.#valList = new Array(max).fill(undefined);
        this.#next = new UintArray(max);
        this.#prev = new UintArray(max);
        this.#head = 0;
        this.#tail = 0;
        this.#free = Stack.create(max);
        this.#size = 0;
        this.#calculatedSize = 0;
        if (typeof dispose === 'function') {
            this.#dispose = dispose;
        }
        if (typeof onInsert === 'function') {
            this.#onInsert = onInsert;
        }
        if (typeof disposeAfter === 'function') {
            this.#disposeAfter = disposeAfter;
            this.#disposed = [];
        } else {
            this.#disposeAfter = undefined;
            this.#disposed = undefined;
        }
        this.#hasDispose = !!this.#dispose;
        this.#hasOnInsert = !!this.#onInsert;
        this.#hasDisposeAfter = !!this.#disposeAfter;
        this.noDisposeOnSet = !!noDisposeOnSet;
        this.noUpdateTTL = !!noUpdateTTL;
        this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
        this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
        this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
        this.ignoreFetchAbort = !!ignoreFetchAbort;
        // NB: maxEntrySize is set to maxSize if it's set
        if (this.maxEntrySize !== 0) {
            if (this.#maxSize !== 0) {
                if (!isPosInt(this.#maxSize)) {
                    throw new TypeError('maxSize must be a positive integer if specified');
                }
            }
            if (!isPosInt(this.maxEntrySize)) {
                throw new TypeError('maxEntrySize must be a positive integer if specified');
            }
            this.#initializeSizeTracking();
        }
        this.allowStale = !!allowStale;
        this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
        this.updateAgeOnGet = !!updateAgeOnGet;
        this.updateAgeOnHas = !!updateAgeOnHas;
        this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
        this.ttlAutopurge = !!ttlAutopurge;
        this.ttl = ttl || 0;
        if (this.ttl) {
            if (!isPosInt(this.ttl)) {
                throw new TypeError('ttl must be a positive integer if specified');
            }
            this.#initializeTTLTracking();
        }
        // do not allow completely unbounded caches
        if (this.#max === 0 && this.ttl === 0 && this.#maxSize === 0) {
            throw new TypeError('At least one of max, maxSize, or ttl is required');
        }
        if (!this.ttlAutopurge && !this.#max && !this.#maxSize) {
            const code = 'LRU_CACHE_UNBOUNDED';
            if (shouldWarn(code)) {
                warned.add(code);
                const msg = 'TTL caching without ttlAutopurge, max, or maxSize can ' + 'result in unbounded memory consumption.';
                emitWarning(msg, 'UnboundedCacheWarning', code, LRUCache);
            }
        }
    }
    /**
     * Return the number of ms left in the item's TTL. If item is not in cache,
     * returns `0`. Returns `Infinity` if item is in cache without a defined TTL.
     */ getRemainingTTL(key) {
        return this.#keyMap.has(key) ? Infinity : 0;
    }
    #initializeTTLTracking() {
        const ttls = new ZeroArray(this.#max);
        const starts = new ZeroArray(this.#max);
        this.#ttls = ttls;
        this.#starts = starts;
        const purgeTimers = this.ttlAutopurge ? new Array(this.#max) : undefined;
        this.#autopurgeTimers = purgeTimers;
        this.#setItemTTL = (index, ttl, start = this.#perf.now())=>{
            starts[index] = ttl !== 0 ? start : 0;
            ttls[index] = ttl;
            // clear out the purge timer if we're setting TTL to 0, and
            // previously had a ttl purge timer running, so it doesn't
            // fire unnecessarily.
            if (purgeTimers?.[index]) {
                clearTimeout(purgeTimers[index]);
                purgeTimers[index] = undefined;
            }
            if (ttl !== 0 && purgeTimers) {
                const t = setTimeout(()=>{
                    if (this.#isStale(index)) {
                        this.#delete(this.#keyList[index], 'expire');
                    }
                }, ttl + 1);
                // unref() not supported on all platforms
                /* c8 ignore start */ if (t.unref) {
                    t.unref();
                }
                /* c8 ignore stop */ purgeTimers[index] = t;
            }
        };
        this.#updateItemAge = (index)=>{
            starts[index] = ttls[index] !== 0 ? this.#perf.now() : 0;
        };
        this.#statusTTL = (status, index)=>{
            if (ttls[index]) {
                const ttl = ttls[index];
                const start = starts[index];
                /* c8 ignore next */ if (!ttl || !start) return;
                status.ttl = ttl;
                status.start = start;
                status.now = cachedNow || getNow();
                const age = status.now - start;
                status.remainingTTL = ttl - age;
            }
        };
        // debounce calls to perf.now() to 1s so we're not hitting
        // that costly call repeatedly.
        let cachedNow = 0;
        const getNow = ()=>{
            const n = this.#perf.now();
            if (this.ttlResolution > 0) {
                cachedNow = n;
                const t = setTimeout(()=>cachedNow = 0, this.ttlResolution);
                // not available on all platforms
                /* c8 ignore start */ if (t.unref) {
                    t.unref();
                }
            /* c8 ignore stop */ }
            return n;
        };
        this.getRemainingTTL = (key)=>{
            const index = this.#keyMap.get(key);
            if (index === undefined) {
                return 0;
            }
            const ttl = ttls[index];
            const start = starts[index];
            if (!ttl || !start) {
                return Infinity;
            }
            const age = (cachedNow || getNow()) - start;
            return ttl - age;
        };
        this.#isStale = (index)=>{
            const s = starts[index];
            const t = ttls[index];
            return !!t && !!s && (cachedNow || getNow()) - s > t;
        };
    }
    // conditionally set private methods related to TTL
    #updateItemAge = ()=>{};
    #statusTTL = ()=>{};
    #setItemTTL = ()=>{};
    /* c8 ignore stop */ #isStale = ()=>false;
    #initializeSizeTracking() {
        const sizes = new ZeroArray(this.#max);
        this.#calculatedSize = 0;
        this.#sizes = sizes;
        this.#removeItemSize = (index)=>{
            this.#calculatedSize -= sizes[index];
            sizes[index] = 0;
        };
        this.#requireSize = (k, v, size, sizeCalculation)=>{
            // provisionally accept background fetches.
            // actual value size will be checked when they return.
            if (this.#isBackgroundFetch(v)) {
                return 0;
            }
            if (!isPosInt(size)) {
                if (sizeCalculation) {
                    if (typeof sizeCalculation !== 'function') {
                        throw new TypeError('sizeCalculation must be a function');
                    }
                    size = sizeCalculation(v, k);
                    if (!isPosInt(size)) {
                        throw new TypeError('sizeCalculation return invalid (expect positive integer)');
                    }
                } else {
                    throw new TypeError('invalid size value (must be positive integer). ' + 'When maxSize or maxEntrySize is used, sizeCalculation ' + 'or size must be set.');
                }
            }
            return size;
        };
        this.#addItemSize = (index, size, status)=>{
            sizes[index] = size;
            if (this.#maxSize) {
                const maxSize = this.#maxSize - sizes[index];
                while(this.#calculatedSize > maxSize){
                    this.#evict(true);
                }
            }
            this.#calculatedSize += sizes[index];
            if (status) {
                status.entrySize = size;
                status.totalCalculatedSize = this.#calculatedSize;
            }
        };
    }
    #removeItemSize = (_i)=>{};
    #addItemSize = (_i, _s, _st)=>{};
    #requireSize = (_k, _v, size, sizeCalculation)=>{
        if (size || sizeCalculation) {
            throw new TypeError('cannot set size without setting maxSize or maxEntrySize on cache');
        }
        return 0;
    };
    *#indexes({ allowStale = this.allowStale } = {}) {
        if (this.#size) {
            for(let i = this.#tail; true;){
                if (!this.#isValidIndex(i)) {
                    break;
                }
                if (allowStale || !this.#isStale(i)) {
                    yield i;
                }
                if (i === this.#head) {
                    break;
                } else {
                    i = this.#prev[i];
                }
            }
        }
    }
    *#rindexes({ allowStale = this.allowStale } = {}) {
        if (this.#size) {
            for(let i = this.#head; true;){
                if (!this.#isValidIndex(i)) {
                    break;
                }
                if (allowStale || !this.#isStale(i)) {
                    yield i;
                }
                if (i === this.#tail) {
                    break;
                } else {
                    i = this.#next[i];
                }
            }
        }
    }
    #isValidIndex(index) {
        return index !== undefined && this.#keyMap.get(this.#keyList[index]) === index;
    }
    /**
     * Return a generator yielding `[key, value]` pairs,
     * in order from most recently used to least recently used.
     */ *entries() {
        for (const i of this.#indexes()){
            if (this.#valList[i] !== undefined && this.#keyList[i] !== undefined && !this.#isBackgroundFetch(this.#valList[i])) {
                yield [
                    this.#keyList[i],
                    this.#valList[i]
                ];
            }
        }
    }
    /**
     * Inverse order version of {@link LRUCache.entries}
     *
     * Return a generator yielding `[key, value]` pairs,
     * in order from least recently used to most recently used.
     */ *rentries() {
        for (const i of this.#rindexes()){
            if (this.#valList[i] !== undefined && this.#keyList[i] !== undefined && !this.#isBackgroundFetch(this.#valList[i])) {
                yield [
                    this.#keyList[i],
                    this.#valList[i]
                ];
            }
        }
    }
    /**
     * Return a generator yielding the keys in the cache,
     * in order from most recently used to least recently used.
     */ *keys() {
        for (const i of this.#indexes()){
            const k = this.#keyList[i];
            if (k !== undefined && !this.#isBackgroundFetch(this.#valList[i])) {
                yield k;
            }
        }
    }
    /**
     * Inverse order version of {@link LRUCache.keys}
     *
     * Return a generator yielding the keys in the cache,
     * in order from least recently used to most recently used.
     */ *rkeys() {
        for (const i of this.#rindexes()){
            const k = this.#keyList[i];
            if (k !== undefined && !this.#isBackgroundFetch(this.#valList[i])) {
                yield k;
            }
        }
    }
    /**
     * Return a generator yielding the values in the cache,
     * in order from most recently used to least recently used.
     */ *values() {
        for (const i of this.#indexes()){
            const v = this.#valList[i];
            if (v !== undefined && !this.#isBackgroundFetch(this.#valList[i])) {
                yield this.#valList[i];
            }
        }
    }
    /**
     * Inverse order version of {@link LRUCache.values}
     *
     * Return a generator yielding the values in the cache,
     * in order from least recently used to most recently used.
     */ *rvalues() {
        for (const i of this.#rindexes()){
            const v = this.#valList[i];
            if (v !== undefined && !this.#isBackgroundFetch(this.#valList[i])) {
                yield this.#valList[i];
            }
        }
    }
    /**
     * Iterating over the cache itself yields the same results as
     * {@link LRUCache.entries}
     */ [Symbol.iterator]() {
        return this.entries();
    }
    /**
     * A String value that is used in the creation of the default string
     * description of an object. Called by the built-in method
     * `Object.prototype.toString`.
     */ [Symbol.toStringTag] = 'LRUCache';
    /**
     * Find a value for which the supplied fn method returns a truthy value,
     * similar to `Array.find()`. fn is called as `fn(value, key, cache)`.
     */ find(fn, getOptions = {}) {
        for (const i of this.#indexes()){
            const v = this.#valList[i];
            const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
            if (value === undefined) continue;
            if (fn(value, this.#keyList[i], this)) {
                return this.get(this.#keyList[i], getOptions);
            }
        }
    }
    /**
     * Call the supplied function on each item in the cache, in order from most
     * recently used to least recently used.
     *
     * `fn` is called as `fn(value, key, cache)`.
     *
     * If `thisp` is provided, function will be called in the `this`-context of
     * the provided object, or the cache if no `thisp` object is provided.
     *
     * Does not update age or recenty of use, or iterate over stale values.
     */ forEach(fn, thisp = this) {
        for (const i of this.#indexes()){
            const v = this.#valList[i];
            const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
            if (value === undefined) continue;
            fn.call(thisp, value, this.#keyList[i], this);
        }
    }
    /**
     * The same as {@link LRUCache.forEach} but items are iterated over in
     * reverse order.  (ie, less recently used items are iterated over first.)
     */ rforEach(fn, thisp = this) {
        for (const i of this.#rindexes()){
            const v = this.#valList[i];
            const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
            if (value === undefined) continue;
            fn.call(thisp, value, this.#keyList[i], this);
        }
    }
    /**
     * Delete any stale entries. Returns true if anything was removed,
     * false otherwise.
     */ purgeStale() {
        let deleted = false;
        for (const i of this.#rindexes({
            allowStale: true
        })){
            if (this.#isStale(i)) {
                this.#delete(this.#keyList[i], 'expire');
                deleted = true;
            }
        }
        return deleted;
    }
    /**
     * Get the extended info about a given entry, to get its value, size, and
     * TTL info simultaneously. Returns `undefined` if the key is not present.
     *
     * Unlike {@link LRUCache#dump}, which is designed to be portable and survive
     * serialization, the `start` value is always the current timestamp, and the
     * `ttl` is a calculated remaining time to live (negative if expired).
     *
     * Always returns stale values, if their info is found in the cache, so be
     * sure to check for expirations (ie, a negative {@link LRUCache.Entry#ttl})
     * if relevant.
     */ info(key) {
        const i = this.#keyMap.get(key);
        if (i === undefined) return undefined;
        const v = this.#valList[i];
        /* c8 ignore start - this isn't tested for the info function,
         * but it's the same logic as found in other places. */ const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
        if (value === undefined) return undefined;
        /* c8 ignore end */ const entry = {
            value
        };
        if (this.#ttls && this.#starts) {
            const ttl = this.#ttls[i];
            const start = this.#starts[i];
            if (ttl && start) {
                const remain = ttl - (this.#perf.now() - start);
                entry.ttl = remain;
                entry.start = Date.now();
            }
        }
        if (this.#sizes) {
            entry.size = this.#sizes[i];
        }
        return entry;
    }
    /**
     * Return an array of [key, {@link LRUCache.Entry}] tuples which can be
     * passed to {@link LRUCache#load}.
     *
     * The `start` fields are calculated relative to a portable `Date.now()`
     * timestamp, even if `performance.now()` is available.
     *
     * Stale entries are always included in the `dump`, even if
     * {@link LRUCache.OptionsBase.allowStale} is false.
     *
     * Note: this returns an actual array, not a generator, so it can be more
     * easily passed around.
     */ dump() {
        const arr = [];
        for (const i of this.#indexes({
            allowStale: true
        })){
            const key = this.#keyList[i];
            const v = this.#valList[i];
            const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
            if (value === undefined || key === undefined) continue;
            const entry = {
                value
            };
            if (this.#ttls && this.#starts) {
                entry.ttl = this.#ttls[i];
                // always dump the start relative to a portable timestamp
                // it's ok for this to be a bit slow, it's a rare operation.
                const age = this.#perf.now() - this.#starts[i];
                entry.start = Math.floor(Date.now() - age);
            }
            if (this.#sizes) {
                entry.size = this.#sizes[i];
            }
            arr.unshift([
                key,
                entry
            ]);
        }
        return arr;
    }
    /**
     * Reset the cache and load in the items in entries in the order listed.
     *
     * The shape of the resulting cache may be different if the same options are
     * not used in both caches.
     *
     * The `start` fields are assumed to be calculated relative to a portable
     * `Date.now()` timestamp, even if `performance.now()` is available.
     */ load(arr) {
        this.clear();
        for (const [key, entry] of arr){
            if (entry.start) {
                // entry.start is a portable timestamp, but we may be using
                // node's performance.now(), so calculate the offset, so that
                // we get the intended remaining TTL, no matter how long it's
                // been on ice.
                //
                // it's ok for this to be a bit slow, it's a rare operation.
                const age = Date.now() - entry.start;
                entry.start = this.#perf.now() - age;
            }
            this.set(key, entry.value, entry);
        }
    }
    /**
     * Add a value to the cache.
     *
     * Note: if `undefined` is specified as a value, this is an alias for
     * {@link LRUCache#delete}
     *
     * Fields on the {@link LRUCache.SetOptions} options param will override
     * their corresponding values in the constructor options for the scope
     * of this single `set()` operation.
     *
     * If `start` is provided, then that will set the effective start
     * time for the TTL calculation. Note that this must be a previous
     * value of `performance.now()` if supported, or a previous value of
     * `Date.now()` if not.
     *
     * Options object may also include `size`, which will prevent
     * calling the `sizeCalculation` function and just use the specified
     * number if it is a positive integer, and `noDisposeOnSet` which
     * will prevent calling a `dispose` function in the case of
     * overwrites.
     *
     * If the `size` (or return value of `sizeCalculation`) for a given
     * entry is greater than `maxEntrySize`, then the item will not be
     * added to the cache.
     *
     * Will update the recency of the entry.
     *
     * If the value is `undefined`, then this is an alias for
     * `cache.delete(key)`. `undefined` is never stored in the cache.
     */ set(k, v, setOptions = {}) {
        if (v === undefined) {
            this.delete(k);
            return this;
        }
        const { ttl = this.ttl, start, noDisposeOnSet = this.noDisposeOnSet, sizeCalculation = this.sizeCalculation, status } = setOptions;
        let { noUpdateTTL = this.noUpdateTTL } = setOptions;
        const size = this.#requireSize(k, v, setOptions.size || 0, sizeCalculation);
        // if the item doesn't fit, don't do anything
        // NB: maxEntrySize set to maxSize by default
        if (this.maxEntrySize && size > this.maxEntrySize) {
            if (status) {
                status.set = 'miss';
                status.maxEntrySizeExceeded = true;
            }
            // have to delete, in case something is there already.
            this.#delete(k, 'set');
            return this;
        }
        let index = this.#size === 0 ? undefined : this.#keyMap.get(k);
        if (index === undefined) {
            // addition
            index = this.#size === 0 ? this.#tail : this.#free.length !== 0 ? this.#free.pop() : this.#size === this.#max ? this.#evict(false) : this.#size;
            this.#keyList[index] = k;
            this.#valList[index] = v;
            this.#keyMap.set(k, index);
            this.#next[this.#tail] = index;
            this.#prev[index] = this.#tail;
            this.#tail = index;
            this.#size++;
            this.#addItemSize(index, size, status);
            if (status) status.set = 'add';
            noUpdateTTL = false;
            if (this.#hasOnInsert) {
                this.#onInsert?.(v, k, 'add');
            }
        } else {
            // update
            this.#moveToTail(index);
            const oldVal = this.#valList[index];
            if (v !== oldVal) {
                if (this.#hasFetchMethod && this.#isBackgroundFetch(oldVal)) {
                    oldVal.__abortController.abort(new Error('replaced'));
                    const { __staleWhileFetching: s } = oldVal;
                    if (s !== undefined && !noDisposeOnSet) {
                        if (this.#hasDispose) {
                            this.#dispose?.(s, k, 'set');
                        }
                        if (this.#hasDisposeAfter) {
                            this.#disposed?.push([
                                s,
                                k,
                                'set'
                            ]);
                        }
                    }
                } else if (!noDisposeOnSet) {
                    if (this.#hasDispose) {
                        this.#dispose?.(oldVal, k, 'set');
                    }
                    if (this.#hasDisposeAfter) {
                        this.#disposed?.push([
                            oldVal,
                            k,
                            'set'
                        ]);
                    }
                }
                this.#removeItemSize(index);
                this.#addItemSize(index, size, status);
                this.#valList[index] = v;
                if (status) {
                    status.set = 'replace';
                    const oldValue = oldVal && this.#isBackgroundFetch(oldVal) ? oldVal.__staleWhileFetching : oldVal;
                    if (oldValue !== undefined) status.oldValue = oldValue;
                }
            } else if (status) {
                status.set = 'update';
            }
            if (this.#hasOnInsert) {
                this.onInsert?.(v, k, v === oldVal ? 'update' : 'replace');
            }
        }
        if (ttl !== 0 && !this.#ttls) {
            this.#initializeTTLTracking();
        }
        if (this.#ttls) {
            if (!noUpdateTTL) {
                this.#setItemTTL(index, ttl, start);
            }
            if (status) this.#statusTTL(status, index);
        }
        if (!noDisposeOnSet && this.#hasDisposeAfter && this.#disposed) {
            const dt = this.#disposed;
            let task;
            while(task = dt?.shift()){
                this.#disposeAfter?.(...task);
            }
        }
        return this;
    }
    /**
     * Evict the least recently used item, returning its value or
     * `undefined` if cache is empty.
     */ pop() {
        try {
            while(this.#size){
                const val = this.#valList[this.#head];
                this.#evict(true);
                if (this.#isBackgroundFetch(val)) {
                    if (val.__staleWhileFetching) {
                        return val.__staleWhileFetching;
                    }
                } else if (val !== undefined) {
                    return val;
                }
            }
        } finally{
            if (this.#hasDisposeAfter && this.#disposed) {
                const dt = this.#disposed;
                let task;
                while(task = dt?.shift()){
                    this.#disposeAfter?.(...task);
                }
            }
        }
    }
    #evict(free) {
        const head = this.#head;
        const k = this.#keyList[head];
        const v = this.#valList[head];
        if (this.#hasFetchMethod && this.#isBackgroundFetch(v)) {
            v.__abortController.abort(new Error('evicted'));
        } else if (this.#hasDispose || this.#hasDisposeAfter) {
            if (this.#hasDispose) {
                this.#dispose?.(v, k, 'evict');
            }
            if (this.#hasDisposeAfter) {
                this.#disposed?.push([
                    v,
                    k,
                    'evict'
                ]);
            }
        }
        this.#removeItemSize(head);
        if (this.#autopurgeTimers?.[head]) {
            clearTimeout(this.#autopurgeTimers[head]);
            this.#autopurgeTimers[head] = undefined;
        }
        // if we aren't about to use the index, then null these out
        if (free) {
            this.#keyList[head] = undefined;
            this.#valList[head] = undefined;
            this.#free.push(head);
        }
        if (this.#size === 1) {
            this.#head = this.#tail = 0;
            this.#free.length = 0;
        } else {
            this.#head = this.#next[head];
        }
        this.#keyMap.delete(k);
        this.#size--;
        return head;
    }
    /**
     * Check if a key is in the cache, without updating the recency of use.
     * Will return false if the item is stale, even though it is technically
     * in the cache.
     *
     * Check if a key is in the cache, without updating the recency of
     * use. Age is updated if {@link LRUCache.OptionsBase.updateAgeOnHas} is set
     * to `true` in either the options or the constructor.
     *
     * Will return `false` if the item is stale, even though it is technically in
     * the cache. The difference can be determined (if it matters) by using a
     * `status` argument, and inspecting the `has` field.
     *
     * Will not update item age unless
     * {@link LRUCache.OptionsBase.updateAgeOnHas} is set.
     */ has(k, hasOptions = {}) {
        const { updateAgeOnHas = this.updateAgeOnHas, status } = hasOptions;
        const index = this.#keyMap.get(k);
        if (index !== undefined) {
            const v = this.#valList[index];
            if (this.#isBackgroundFetch(v) && v.__staleWhileFetching === undefined) {
                return false;
            }
            if (!this.#isStale(index)) {
                if (updateAgeOnHas) {
                    this.#updateItemAge(index);
                }
                if (status) {
                    status.has = 'hit';
                    this.#statusTTL(status, index);
                }
                return true;
            } else if (status) {
                status.has = 'stale';
                this.#statusTTL(status, index);
            }
        } else if (status) {
            status.has = 'miss';
        }
        return false;
    }
    /**
     * Like {@link LRUCache#get} but doesn't update recency or delete stale
     * items.
     *
     * Returns `undefined` if the item is stale, unless
     * {@link LRUCache.OptionsBase.allowStale} is set.
     */ peek(k, peekOptions = {}) {
        const { allowStale = this.allowStale } = peekOptions;
        const index = this.#keyMap.get(k);
        if (index === undefined || !allowStale && this.#isStale(index)) {
            return;
        }
        const v = this.#valList[index];
        // either stale and allowed, or forcing a refresh of non-stale value
        return this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
    }
    #backgroundFetch(k, index, options, context) {
        const v = index === undefined ? undefined : this.#valList[index];
        if (this.#isBackgroundFetch(v)) {
            return v;
        }
        const ac = new AC();
        const { signal } = options;
        // when/if our AC signals, then stop listening to theirs.
        signal?.addEventListener('abort', ()=>ac.abort(signal.reason), {
            signal: ac.signal
        });
        const fetchOpts = {
            signal: ac.signal,
            options,
            context
        };
        const cb = (v, updateCache = false)=>{
            const { aborted } = ac.signal;
            const ignoreAbort = options.ignoreFetchAbort && v !== undefined;
            if (options.status) {
                if (aborted && !updateCache) {
                    options.status.fetchAborted = true;
                    options.status.fetchError = ac.signal.reason;
                    if (ignoreAbort) options.status.fetchAbortIgnored = true;
                } else {
                    options.status.fetchResolved = true;
                }
            }
            if (aborted && !ignoreAbort && !updateCache) {
                return fetchFail(ac.signal.reason);
            }
            // either we didn't abort, and are still here, or we did, and ignored
            const bf = p;
            // if nothing else has been written there but we're set to update the
            // cache and ignore the abort, or if it's still pending on this specific
            // background request, then write it to the cache.
            const vl = this.#valList[index];
            if (vl === p || ignoreAbort && updateCache && vl === undefined) {
                if (v === undefined) {
                    if (bf.__staleWhileFetching !== undefined) {
                        this.#valList[index] = bf.__staleWhileFetching;
                    } else {
                        this.#delete(k, 'fetch');
                    }
                } else {
                    if (options.status) options.status.fetchUpdated = true;
                    this.set(k, v, fetchOpts.options);
                }
            }
            return v;
        };
        const eb = (er)=>{
            if (options.status) {
                options.status.fetchRejected = true;
                options.status.fetchError = er;
            }
            return fetchFail(er);
        };
        const fetchFail = (er)=>{
            const { aborted } = ac.signal;
            const allowStaleAborted = aborted && options.allowStaleOnFetchAbort;
            const allowStale = allowStaleAborted || options.allowStaleOnFetchRejection;
            const noDelete = allowStale || options.noDeleteOnFetchRejection;
            const bf = p;
            if (this.#valList[index] === p) {
                // if we allow stale on fetch rejections, then we need to ensure that
                // the stale value is not removed from the cache when the fetch fails.
                const del = !noDelete || bf.__staleWhileFetching === undefined;
                if (del) {
                    this.#delete(k, 'fetch');
                } else if (!allowStaleAborted) {
                    // still replace the *promise* with the stale value,
                    // since we are done with the promise at this point.
                    // leave it untouched if we're still waiting for an
                    // aborted background fetch that hasn't yet returned.
                    this.#valList[index] = bf.__staleWhileFetching;
                }
            }
            if (allowStale) {
                if (options.status && bf.__staleWhileFetching !== undefined) {
                    options.status.returnedStale = true;
                }
                return bf.__staleWhileFetching;
            } else if (bf.__returned === bf) {
                throw er;
            }
        };
        const pcall = (res, rej)=>{
            const fmp = this.#fetchMethod?.(k, v, fetchOpts);
            if (fmp && fmp instanceof Promise) {
                fmp.then((v)=>res(v === undefined ? undefined : v), rej);
            }
            // ignored, we go until we finish, regardless.
            // defer check until we are actually aborting,
            // so fetchMethod can override.
            ac.signal.addEventListener('abort', ()=>{
                if (!options.ignoreFetchAbort || options.allowStaleOnFetchAbort) {
                    res(undefined);
                    // when it eventually resolves, update the cache.
                    if (options.allowStaleOnFetchAbort) {
                        res = (v)=>cb(v, true);
                    }
                }
            });
        };
        if (options.status) options.status.fetchDispatched = true;
        const p = new Promise(pcall).then(cb, eb);
        const bf = Object.assign(p, {
            __abortController: ac,
            __staleWhileFetching: v,
            __returned: undefined
        });
        if (index === undefined) {
            // internal, don't expose status.
            this.set(k, bf, {
                ...fetchOpts.options,
                status: undefined
            });
            index = this.#keyMap.get(k);
        } else {
            this.#valList[index] = bf;
        }
        return bf;
    }
    #isBackgroundFetch(p) {
        if (!this.#hasFetchMethod) return false;
        const b = p;
        return !!b && b instanceof Promise && b.hasOwnProperty('__staleWhileFetching') && b.__abortController instanceof AC;
    }
    async fetch(k, fetchOptions = {}) {
        const { // get options
        allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, // set options
        ttl = this.ttl, noDisposeOnSet = this.noDisposeOnSet, size = 0, sizeCalculation = this.sizeCalculation, noUpdateTTL = this.noUpdateTTL, // fetch exclusive options
        noDeleteOnFetchRejection = this.noDeleteOnFetchRejection, allowStaleOnFetchRejection = this.allowStaleOnFetchRejection, ignoreFetchAbort = this.ignoreFetchAbort, allowStaleOnFetchAbort = this.allowStaleOnFetchAbort, context, forceRefresh = false, status, signal } = fetchOptions;
        if (!this.#hasFetchMethod) {
            if (status) status.fetch = 'get';
            return this.get(k, {
                allowStale,
                updateAgeOnGet,
                noDeleteOnStaleGet,
                status
            });
        }
        const options = {
            allowStale,
            updateAgeOnGet,
            noDeleteOnStaleGet,
            ttl,
            noDisposeOnSet,
            size,
            sizeCalculation,
            noUpdateTTL,
            noDeleteOnFetchRejection,
            allowStaleOnFetchRejection,
            allowStaleOnFetchAbort,
            ignoreFetchAbort,
            status,
            signal
        };
        let index = this.#keyMap.get(k);
        if (index === undefined) {
            if (status) status.fetch = 'miss';
            const p = this.#backgroundFetch(k, index, options, context);
            return p.__returned = p;
        } else {
            // in cache, maybe already fetching
            const v = this.#valList[index];
            if (this.#isBackgroundFetch(v)) {
                const stale = allowStale && v.__staleWhileFetching !== undefined;
                if (status) {
                    status.fetch = 'inflight';
                    if (stale) status.returnedStale = true;
                }
                return stale ? v.__staleWhileFetching : v.__returned = v;
            }
            // if we force a refresh, that means do NOT serve the cached value,
            // unless we are already in the process of refreshing the cache.
            const isStale = this.#isStale(index);
            if (!forceRefresh && !isStale) {
                if (status) status.fetch = 'hit';
                this.#moveToTail(index);
                if (updateAgeOnGet) {
                    this.#updateItemAge(index);
                }
                if (status) this.#statusTTL(status, index);
                return v;
            }
            // ok, it is stale or a forced refresh, and not already fetching.
            // refresh the cache.
            const p = this.#backgroundFetch(k, index, options, context);
            const hasStale = p.__staleWhileFetching !== undefined;
            const staleVal = hasStale && allowStale;
            if (status) {
                status.fetch = isStale ? 'stale' : 'refresh';
                if (staleVal && isStale) status.returnedStale = true;
            }
            return staleVal ? p.__staleWhileFetching : p.__returned = p;
        }
    }
    async forceFetch(k, fetchOptions = {}) {
        const v = await this.fetch(k, fetchOptions);
        if (v === undefined) throw new Error('fetch() returned undefined');
        return v;
    }
    memo(k, memoOptions = {}) {
        const memoMethod = this.#memoMethod;
        if (!memoMethod) {
            throw new Error('no memoMethod provided to constructor');
        }
        const { context, forceRefresh, ...options } = memoOptions;
        const v = this.get(k, options);
        if (!forceRefresh && v !== undefined) return v;
        const vv = memoMethod(k, v, {
            options,
            context
        });
        this.set(k, vv, options);
        return vv;
    }
    /**
     * Return a value from the cache. Will update the recency of the cache
     * entry found.
     *
     * If the key is not found, get() will return `undefined`.
     */ get(k, getOptions = {}) {
        const { allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, status } = getOptions;
        const index = this.#keyMap.get(k);
        if (index !== undefined) {
            const value = this.#valList[index];
            const fetching = this.#isBackgroundFetch(value);
            if (status) this.#statusTTL(status, index);
            if (this.#isStale(index)) {
                if (status) status.get = 'stale';
                // delete only if not an in-flight background fetch
                if (!fetching) {
                    if (!noDeleteOnStaleGet) {
                        this.#delete(k, 'expire');
                    }
                    if (status && allowStale) status.returnedStale = true;
                    return allowStale ? value : undefined;
                } else {
                    if (status && allowStale && value.__staleWhileFetching !== undefined) {
                        status.returnedStale = true;
                    }
                    return allowStale ? value.__staleWhileFetching : undefined;
                }
            } else {
                if (status) status.get = 'hit';
                // if we're currently fetching it, we don't actually have it yet
                // it's not stale, which means this isn't a staleWhileRefetching.
                // If it's not stale, and fetching, AND has a __staleWhileFetching
                // value, then that means the user fetched with {forceRefresh:true},
                // so it's safe to return that value.
                if (fetching) {
                    return value.__staleWhileFetching;
                }
                this.#moveToTail(index);
                if (updateAgeOnGet) {
                    this.#updateItemAge(index);
                }
                return value;
            }
        } else if (status) {
            status.get = 'miss';
        }
    }
    #connect(p, n) {
        this.#prev[n] = p;
        this.#next[p] = n;
    }
    #moveToTail(index) {
        // if tail already, nothing to do
        // if head, move head to next[index]
        // else
        //   move next[prev[index]] to next[index] (head has no prev)
        //   move prev[next[index]] to prev[index]
        // prev[index] = tail
        // next[tail] = index
        // tail = index
        if (index !== this.#tail) {
            if (index === this.#head) {
                this.#head = this.#next[index];
            } else {
                this.#connect(this.#prev[index], this.#next[index]);
            }
            this.#connect(this.#tail, index);
            this.#tail = index;
        }
    }
    /**
     * Deletes a key out of the cache.
     *
     * Returns true if the key was deleted, false otherwise.
     */ delete(k) {
        return this.#delete(k, 'delete');
    }
    #delete(k, reason) {
        let deleted = false;
        if (this.#size !== 0) {
            const index = this.#keyMap.get(k);
            if (index !== undefined) {
                if (this.#autopurgeTimers?.[index]) {
                    clearTimeout(this.#autopurgeTimers?.[index]);
                    this.#autopurgeTimers[index] = undefined;
                }
                deleted = true;
                if (this.#size === 1) {
                    this.#clear(reason);
                } else {
                    this.#removeItemSize(index);
                    const v = this.#valList[index];
                    if (this.#isBackgroundFetch(v)) {
                        v.__abortController.abort(new Error('deleted'));
                    } else if (this.#hasDispose || this.#hasDisposeAfter) {
                        if (this.#hasDispose) {
                            this.#dispose?.(v, k, reason);
                        }
                        if (this.#hasDisposeAfter) {
                            this.#disposed?.push([
                                v,
                                k,
                                reason
                            ]);
                        }
                    }
                    this.#keyMap.delete(k);
                    this.#keyList[index] = undefined;
                    this.#valList[index] = undefined;
                    if (index === this.#tail) {
                        this.#tail = this.#prev[index];
                    } else if (index === this.#head) {
                        this.#head = this.#next[index];
                    } else {
                        const pi = this.#prev[index];
                        this.#next[pi] = this.#next[index];
                        const ni = this.#next[index];
                        this.#prev[ni] = this.#prev[index];
                    }
                    this.#size--;
                    this.#free.push(index);
                }
            }
        }
        if (this.#hasDisposeAfter && this.#disposed?.length) {
            const dt = this.#disposed;
            let task;
            while(task = dt?.shift()){
                this.#disposeAfter?.(...task);
            }
        }
        return deleted;
    }
    /**
     * Clear the cache entirely, throwing away all values.
     */ clear() {
        return this.#clear('delete');
    }
    #clear(reason) {
        for (const index of this.#rindexes({
            allowStale: true
        })){
            const v = this.#valList[index];
            if (this.#isBackgroundFetch(v)) {
                v.__abortController.abort(new Error('deleted'));
            } else {
                const k = this.#keyList[index];
                if (this.#hasDispose) {
                    this.#dispose?.(v, k, reason);
                }
                if (this.#hasDisposeAfter) {
                    this.#disposed?.push([
                        v,
                        k,
                        reason
                    ]);
                }
            }
        }
        this.#keyMap.clear();
        this.#valList.fill(undefined);
        this.#keyList.fill(undefined);
        if (this.#ttls && this.#starts) {
            this.#ttls.fill(0);
            this.#starts.fill(0);
            for (const t of this.#autopurgeTimers ?? []){
                if (t !== undefined) clearTimeout(t);
            }
            this.#autopurgeTimers?.fill(undefined);
        }
        if (this.#sizes) {
            this.#sizes.fill(0);
        }
        this.#head = 0;
        this.#tail = 0;
        this.#free.length = 0;
        this.#calculatedSize = 0;
        this.#size = 0;
        if (this.#hasDisposeAfter && this.#disposed) {
            const dt = this.#disposed;
            let task;
            while(task = dt?.shift()){
                this.#disposeAfter?.(...task);
            }
        }
    }
}
exports.LRUCache = LRUCache; //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/cross-inspect/esm/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "inspect",
    ()=>inspect
]);
// Taken from graphql-js
// https://github.com/graphql/graphql-js/blob/main/src/jsutils/inspect.ts
const MAX_RECURSIVE_DEPTH = 3;
function inspect(value) {
    return formatValue(value, []);
}
function formatValue(value, seenValues) {
    switch(typeof value){
        case 'string':
            return JSON.stringify(value);
        case 'function':
            return value.name ? `[function ${value.name}]` : '[function]';
        case 'object':
            return formatObjectValue(value, seenValues);
        default:
            return String(value);
    }
}
function formatError(value) {
    // eslint-disable-next-line no-constant-condition
    if (value.name = 'GraphQLError') {
        return value.toString();
    }
    return `${value.name}: ${value.message};\n ${value.stack}`;
}
function formatObjectValue(value, previouslySeenValues) {
    if (value === null) {
        return 'null';
    }
    if (value instanceof Error) {
        if (value.name === 'AggregateError') {
            return formatError(value) + '\n' + formatArray(value.errors, previouslySeenValues);
        }
        return formatError(value);
    }
    if (previouslySeenValues.includes(value)) {
        return '[Circular]';
    }
    const seenValues = [
        ...previouslySeenValues,
        value
    ];
    if (isJSONable(value)) {
        const jsonValue = value.toJSON();
        // check for infinite recursion
        if (jsonValue !== value) {
            return typeof jsonValue === 'string' ? jsonValue : formatValue(jsonValue, seenValues);
        }
    } else if (Array.isArray(value)) {
        return formatArray(value, seenValues);
    }
    return formatObject(value, seenValues);
}
function isJSONable(value) {
    return typeof value.toJSON === 'function';
}
function formatObject(object, seenValues) {
    const entries = Object.entries(object);
    if (entries.length === 0) {
        return '{}';
    }
    if (seenValues.length > MAX_RECURSIVE_DEPTH) {
        return '[' + getObjectTag(object) + ']';
    }
    const properties = entries.map(([key, value])=>key + ': ' + formatValue(value, seenValues));
    return '{ ' + properties.join(', ') + ' }';
}
function formatArray(array, seenValues) {
    if (array.length === 0) {
        return '[]';
    }
    if (seenValues.length > MAX_RECURSIVE_DEPTH) {
        return '[Array]';
    }
    const len = array.length;
    const items = [];
    for(let i = 0; i < len; ++i){
        items.push(formatValue(array[i], seenValues));
    }
    return '[' + items.join(', ') + ']';
}
function getObjectTag(object) {
    const tag = Object.prototype.toString.call(object).replace(/^\[object /, '').replace(/]$/, '');
    if (tag === 'Object' && typeof object.constructor === 'function') {
        const name = object.constructor.name;
        if (typeof name === 'string' && name !== '') {
            return name;
        }
    }
    return tag;
}
}),
"[project]/node_modules/cross-inspect/cjs/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.inspect = void 0;
// Taken from graphql-js
// https://github.com/graphql/graphql-js/blob/main/src/jsutils/inspect.ts
const MAX_RECURSIVE_DEPTH = 3;
/**
 * Used to print values in error messages.
 */ function inspect(value) {
    return formatValue(value, []);
}
exports.inspect = inspect;
function formatValue(value, seenValues) {
    switch(typeof value){
        case 'string':
            return JSON.stringify(value);
        case 'function':
            return value.name ? `[function ${value.name}]` : '[function]';
        case 'object':
            return formatObjectValue(value, seenValues);
        default:
            return String(value);
    }
}
function formatError(value) {
    // eslint-disable-next-line no-constant-condition
    if (value.name = 'GraphQLError') {
        return value.toString();
    }
    return `${value.name}: ${value.message};\n ${value.stack}`;
}
function formatObjectValue(value, previouslySeenValues) {
    if (value === null) {
        return 'null';
    }
    if (value instanceof Error) {
        if (value.name === 'AggregateError') {
            return formatError(value) + '\n' + formatArray(value.errors, previouslySeenValues);
        }
        return formatError(value);
    }
    if (previouslySeenValues.includes(value)) {
        return '[Circular]';
    }
    const seenValues = [
        ...previouslySeenValues,
        value
    ];
    if (isJSONable(value)) {
        const jsonValue = value.toJSON();
        // check for infinite recursion
        if (jsonValue !== value) {
            return typeof jsonValue === 'string' ? jsonValue : formatValue(jsonValue, seenValues);
        }
    } else if (Array.isArray(value)) {
        return formatArray(value, seenValues);
    }
    return formatObject(value, seenValues);
}
function isJSONable(value) {
    return typeof value.toJSON === 'function';
}
function formatObject(object, seenValues) {
    const entries = Object.entries(object);
    if (entries.length === 0) {
        return '{}';
    }
    if (seenValues.length > MAX_RECURSIVE_DEPTH) {
        return '[' + getObjectTag(object) + ']';
    }
    const properties = entries.map(([key, value])=>key + ': ' + formatValue(value, seenValues));
    return '{ ' + properties.join(', ') + ' }';
}
function formatArray(array, seenValues) {
    if (array.length === 0) {
        return '[]';
    }
    if (seenValues.length > MAX_RECURSIVE_DEPTH) {
        return '[Array]';
    }
    const len = array.length;
    const items = [];
    for(let i = 0; i < len; ++i){
        items.push(formatValue(array[i], seenValues));
    }
    return '[' + items.join(', ') + ']';
}
function getObjectTag(object) {
    const tag = Object.prototype.toString.call(object).replace(/^\[object /, '').replace(/]$/, '');
    if (tag === 'Object' && typeof object.constructor === 'function') {
        const name = object.constructor.name;
        if (typeof name === 'string' && name !== '') {
            return name;
        }
    }
    return tag;
}
}),
"[project]/node_modules/@whatwg-node/promise-helpers/esm/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDeferredPromise",
    ()=>createDeferredPromise,
    "fakePromise",
    ()=>fakePromise,
    "fakeRejectPromise",
    ()=>fakeRejectPromise,
    "handleMaybePromise",
    ()=>handleMaybePromise,
    "isActualPromise",
    ()=>isActualPromise,
    "isPromise",
    ()=>isPromise,
    "iterateAsync",
    ()=>iterateAsync,
    "iterateAsyncVoid",
    ()=>iterateAsync,
    "mapAsyncIterator",
    ()=>mapAsyncIterator,
    "mapMaybePromise",
    ()=>mapMaybePromise,
    "promiseLikeFinally",
    ()=>promiseLikeFinally,
    "unfakePromise",
    ()=>unfakePromise
]);
const kFakePromise = Symbol.for('@whatwg-node/promise-helpers/FakePromise');
function isPromise(value) {
    return value?.then != null;
}
function isActualPromise(value) {
    const maybePromise = value;
    return maybePromise && maybePromise.then && maybePromise.catch && maybePromise.finally;
}
function handleMaybePromise(inputFactory, outputSuccessFactory, outputErrorFactory, finallyFactory) {
    let result$ = fakePromise().then(inputFactory).then(outputSuccessFactory, outputErrorFactory);
    if (finallyFactory) {
        result$ = result$.finally(finallyFactory);
    }
    return unfakePromise(result$);
}
function fakePromise(value) {
    if (value && isActualPromise(value)) {
        return value;
    }
    if (isPromise(value)) {
        return {
            then: (resolve, reject)=>fakePromise(value.then(resolve, reject)),
            catch: (reject)=>fakePromise(value.then((res)=>res, reject)),
            finally: (cb)=>fakePromise(cb ? promiseLikeFinally(value, cb) : value),
            [Symbol.toStringTag]: 'Promise'
        };
    }
    // Write a fake promise to avoid the promise constructor
    // being called with `new Promise` in the browser.
    return {
        then (resolve) {
            if (resolve) {
                try {
                    return fakePromise(resolve(value));
                } catch (err) {
                    return fakeRejectPromise(err);
                }
            }
            return this;
        },
        catch () {
            return this;
        },
        finally (cb) {
            if (cb) {
                try {
                    return fakePromise(cb()).then(()=>value, ()=>value);
                } catch (err) {
                    return fakeRejectPromise(err);
                }
            }
            return this;
        },
        [Symbol.toStringTag]: 'Promise',
        __fakePromiseValue: value,
        [kFakePromise]: 'resolved'
    };
}
function createDeferredPromise() {
    if (Promise.withResolvers) {
        return Promise.withResolvers();
    }
    let resolveFn;
    let rejectFn;
    const promise = new Promise(function deferredPromiseExecutor(resolve, reject) {
        resolveFn = resolve;
        rejectFn = reject;
    });
    return {
        promise,
        get resolve () {
            return resolveFn;
        },
        get reject () {
            return rejectFn;
        }
    };
}
;
function iterateAsync(iterable, callback, results) {
    if (iterable?.length === 0) {
        return;
    }
    const iterator = iterable[Symbol.iterator]();
    let index = 0;
    function iterate() {
        const { done: endOfIterator, value } = iterator.next();
        if (endOfIterator) {
            return;
        }
        let endedEarly = false;
        function endEarly() {
            endedEarly = true;
        }
        return handleMaybePromise(function handleCallback() {
            return callback(value, endEarly, index++);
        }, function handleCallbackResult(result) {
            if (result) {
                results?.push(result);
            }
            if (endedEarly) {
                return;
            }
            return iterate();
        });
    }
    return iterate();
}
function fakeRejectPromise(error) {
    return {
        then (_resolve, reject) {
            if (reject) {
                try {
                    return fakePromise(reject(error));
                } catch (err) {
                    return fakeRejectPromise(err);
                }
            }
            return this;
        },
        catch (reject) {
            if (reject) {
                try {
                    return fakePromise(reject(error));
                } catch (err) {
                    return fakeRejectPromise(err);
                }
            }
            return this;
        },
        finally (cb) {
            if (cb) {
                try {
                    cb();
                } catch (err) {
                    return fakeRejectPromise(err);
                }
            }
            return this;
        },
        __fakeRejectError: error,
        [Symbol.toStringTag]: 'Promise',
        [kFakePromise]: 'rejected'
    };
}
function mapMaybePromise(input, onSuccess, onError) {
    return handleMaybePromise(()=>input, onSuccess, onError);
}
function mapAsyncIterator(iterator, onNext, onError, onEnd) {
    if (Symbol.asyncIterator in iterator) {
        iterator = iterator[Symbol.asyncIterator]();
    }
    let $return;
    let abruptClose;
    let onEndWithValue;
    if (onEnd) {
        let onEndWithValueResult /** R in onEndWithValue */ ;
        onEndWithValue = (value)=>{
            onEndWithValueResult ||= handleMaybePromise(onEnd, ()=>value, ()=>value);
            return onEndWithValueResult;
        };
    }
    if (typeof iterator.return === 'function') {
        $return = iterator.return;
        abruptClose = (error)=>{
            const rethrow = ()=>{
                throw error;
            };
            return $return.call(iterator).then(rethrow, rethrow);
        };
    }
    function mapResult(result) {
        if (result.done) {
            return onEndWithValue ? onEndWithValue(result) : result;
        }
        return handleMaybePromise(()=>result.value, (value)=>handleMaybePromise(()=>onNext(value), iteratorResult, abruptClose));
    }
    let mapReject;
    if (onError) {
        let onErrorResult;
        // Capture rejectCallback to ensure it cannot be null.
        const reject = onError;
        mapReject = (error)=>{
            onErrorResult ||= handleMaybePromise(()=>error, (error)=>handleMaybePromise(()=>reject(error), iteratorResult, abruptClose));
            return onErrorResult;
        };
    }
    return {
        next () {
            return iterator.next().then(mapResult, mapReject);
        },
        return () {
            const res$ = $return ? $return.call(iterator).then(mapResult, mapReject) : fakePromise({
                value: undefined,
                done: true
            });
            return onEndWithValue ? res$.then(onEndWithValue) : res$;
        },
        throw (error) {
            if (typeof iterator.throw === 'function') {
                return iterator.throw(error).then(mapResult, mapReject);
            }
            if (abruptClose) {
                return abruptClose(error);
            }
            return fakeRejectPromise(error);
        },
        [Symbol.asyncIterator] () {
            return this;
        }
    };
}
function iteratorResult(value) {
    return {
        value,
        done: false
    };
}
function isFakePromise(value) {
    return value?.[kFakePromise] === 'resolved';
}
function isFakeRejectPromise(value) {
    return value?.[kFakePromise] === 'rejected';
}
function promiseLikeFinally(value, onFinally) {
    if ('finally' in value) {
        return value.finally(onFinally);
    }
    return value.then((res)=>{
        const finallyRes = onFinally();
        return isPromise(finallyRes) ? finallyRes.then(()=>res) : res;
    }, (err)=>{
        const finallyRes = onFinally();
        if (isPromise(finallyRes)) {
            return finallyRes.then(()=>{
                throw err;
            });
        } else {
            throw err;
        }
    });
}
function unfakePromise(promise) {
    if (isFakePromise(promise)) {
        return promise.__fakePromiseValue;
    }
    if (isFakeRejectPromise(promise)) {
        throw promise.__fakeRejectError;
    }
    return promise;
}
}),
"[project]/node_modules/@whatwg-node/promise-helpers/cjs/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isPromise = isPromise;
exports.isActualPromise = isActualPromise;
exports.handleMaybePromise = handleMaybePromise;
exports.fakePromise = fakePromise;
exports.createDeferredPromise = createDeferredPromise;
exports.iterateAsync = iterateAsync;
exports.iterateAsyncVoid = iterateAsync;
exports.fakeRejectPromise = fakeRejectPromise;
exports.mapMaybePromise = mapMaybePromise;
exports.mapAsyncIterator = mapAsyncIterator;
exports.promiseLikeFinally = promiseLikeFinally;
exports.unfakePromise = unfakePromise;
const kFakePromise = Symbol.for('@whatwg-node/promise-helpers/FakePromise');
function isPromise(value) {
    return value?.then != null;
}
function isActualPromise(value) {
    const maybePromise = value;
    return maybePromise && maybePromise.then && maybePromise.catch && maybePromise.finally;
}
function handleMaybePromise(inputFactory, outputSuccessFactory, outputErrorFactory, finallyFactory) {
    let result$ = fakePromise().then(inputFactory).then(outputSuccessFactory, outputErrorFactory);
    if (finallyFactory) {
        result$ = result$.finally(finallyFactory);
    }
    return unfakePromise(result$);
}
function fakePromise(value) {
    if (value && isActualPromise(value)) {
        return value;
    }
    if (isPromise(value)) {
        return {
            then: (resolve, reject)=>fakePromise(value.then(resolve, reject)),
            catch: (reject)=>fakePromise(value.then((res)=>res, reject)),
            finally: (cb)=>fakePromise(cb ? promiseLikeFinally(value, cb) : value),
            [Symbol.toStringTag]: 'Promise'
        };
    }
    // Write a fake promise to avoid the promise constructor
    // being called with `new Promise` in the browser.
    return {
        then (resolve) {
            if (resolve) {
                try {
                    return fakePromise(resolve(value));
                } catch (err) {
                    return fakeRejectPromise(err);
                }
            }
            return this;
        },
        catch () {
            return this;
        },
        finally (cb) {
            if (cb) {
                try {
                    return fakePromise(cb()).then(()=>value, ()=>value);
                } catch (err) {
                    return fakeRejectPromise(err);
                }
            }
            return this;
        },
        [Symbol.toStringTag]: 'Promise',
        __fakePromiseValue: value,
        [kFakePromise]: 'resolved'
    };
}
function createDeferredPromise() {
    if (Promise.withResolvers) {
        return Promise.withResolvers();
    }
    let resolveFn;
    let rejectFn;
    const promise = new Promise(function deferredPromiseExecutor(resolve, reject) {
        resolveFn = resolve;
        rejectFn = reject;
    });
    return {
        promise,
        get resolve () {
            return resolveFn;
        },
        get reject () {
            return rejectFn;
        }
    };
}
function iterateAsync(iterable, callback, results) {
    if (iterable?.length === 0) {
        return;
    }
    const iterator = iterable[Symbol.iterator]();
    let index = 0;
    function iterate() {
        const { done: endOfIterator, value } = iterator.next();
        if (endOfIterator) {
            return;
        }
        let endedEarly = false;
        function endEarly() {
            endedEarly = true;
        }
        return handleMaybePromise(function handleCallback() {
            return callback(value, endEarly, index++);
        }, function handleCallbackResult(result) {
            if (result) {
                results?.push(result);
            }
            if (endedEarly) {
                return;
            }
            return iterate();
        });
    }
    return iterate();
}
function fakeRejectPromise(error) {
    return {
        then (_resolve, reject) {
            if (reject) {
                try {
                    return fakePromise(reject(error));
                } catch (err) {
                    return fakeRejectPromise(err);
                }
            }
            return this;
        },
        catch (reject) {
            if (reject) {
                try {
                    return fakePromise(reject(error));
                } catch (err) {
                    return fakeRejectPromise(err);
                }
            }
            return this;
        },
        finally (cb) {
            if (cb) {
                try {
                    cb();
                } catch (err) {
                    return fakeRejectPromise(err);
                }
            }
            return this;
        },
        __fakeRejectError: error,
        [Symbol.toStringTag]: 'Promise',
        [kFakePromise]: 'rejected'
    };
}
function mapMaybePromise(input, onSuccess, onError) {
    return handleMaybePromise(()=>input, onSuccess, onError);
}
/**
 * Given an AsyncIterable and a callback function, return an AsyncIterator
 * which produces values mapped via calling the callback function.
 */ function mapAsyncIterator(iterator, onNext, onError, onEnd) {
    if (Symbol.asyncIterator in iterator) {
        iterator = iterator[Symbol.asyncIterator]();
    }
    let $return;
    let abruptClose;
    let onEndWithValue;
    if (onEnd) {
        let onEndWithValueResult /** R in onEndWithValue */ ;
        onEndWithValue = (value)=>{
            onEndWithValueResult ||= handleMaybePromise(onEnd, ()=>value, ()=>value);
            return onEndWithValueResult;
        };
    }
    if (typeof iterator.return === 'function') {
        $return = iterator.return;
        abruptClose = (error)=>{
            const rethrow = ()=>{
                throw error;
            };
            return $return.call(iterator).then(rethrow, rethrow);
        };
    }
    function mapResult(result) {
        if (result.done) {
            return onEndWithValue ? onEndWithValue(result) : result;
        }
        return handleMaybePromise(()=>result.value, (value)=>handleMaybePromise(()=>onNext(value), iteratorResult, abruptClose));
    }
    let mapReject;
    if (onError) {
        let onErrorResult;
        // Capture rejectCallback to ensure it cannot be null.
        const reject = onError;
        mapReject = (error)=>{
            onErrorResult ||= handleMaybePromise(()=>error, (error)=>handleMaybePromise(()=>reject(error), iteratorResult, abruptClose));
            return onErrorResult;
        };
    }
    return {
        next () {
            return iterator.next().then(mapResult, mapReject);
        },
        return () {
            const res$ = $return ? $return.call(iterator).then(mapResult, mapReject) : fakePromise({
                value: undefined,
                done: true
            });
            return onEndWithValue ? res$.then(onEndWithValue) : res$;
        },
        throw (error) {
            if (typeof iterator.throw === 'function') {
                return iterator.throw(error).then(mapResult, mapReject);
            }
            if (abruptClose) {
                return abruptClose(error);
            }
            return fakeRejectPromise(error);
        },
        [Symbol.asyncIterator] () {
            return this;
        }
    };
}
function iteratorResult(value) {
    return {
        value,
        done: false
    };
}
function isFakePromise(value) {
    return value?.[kFakePromise] === 'resolved';
}
function isFakeRejectPromise(value) {
    return value?.[kFakePromise] === 'rejected';
}
function promiseLikeFinally(value, onFinally) {
    if ('finally' in value) {
        return value.finally(onFinally);
    }
    return value.then((res)=>{
        const finallyRes = onFinally();
        return isPromise(finallyRes) ? finallyRes.then(()=>res) : res;
    }, (err)=>{
        const finallyRes = onFinally();
        if (isPromise(finallyRes)) {
            return finallyRes.then(()=>{
                throw err;
            });
        } else {
            throw err;
        }
    });
}
function unfakePromise(promise) {
    if (isFakePromise(promise)) {
        return promise.__fakePromiseValue;
    }
    if (isFakeRejectPromise(promise)) {
        throw promise.__fakeRejectError;
    }
    return promise;
}
}),
"[project]/node_modules/@graphql-tools/schema/esm/checkForResolveTypeResolver.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkForResolveTypeResolver",
    ()=>checkForResolveTypeResolver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$Interfaces$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@graphql-tools/utils/esm/Interfaces.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$mapSchema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@graphql-tools/utils/esm/mapSchema.js [app-route] (ecmascript)");
;
function checkForResolveTypeResolver(schema, requireResolversForResolveType) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$mapSchema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapSchema"])(schema, {
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$Interfaces$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MapperKind"].ABSTRACT_TYPE]: (type)=>{
            if (!type.resolveType) {
                const message = `Type "${type.name}" is missing a "__resolveType" resolver. Pass 'ignore' into ` + '"resolverValidationOptions.requireResolversForResolveType" to disable this error.';
                if (requireResolversForResolveType === 'error') {
                    throw new Error(message);
                }
                if (requireResolversForResolveType === 'warn') {
                    console.warn(message);
                }
            }
            return undefined;
        }
    });
}
}),
"[project]/node_modules/@graphql-tools/schema/esm/extendResolversFromInterfaces.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extendResolversFromInterfaces",
    ()=>extendResolversFromInterfaces
]);
function extendResolversFromInterfaces(schema, resolvers) {
    const extendedResolvers = {};
    const typeMap = schema.getTypeMap();
    for(const typeName in typeMap){
        const type = typeMap[typeName];
        if ('getInterfaces' in type) {
            extendedResolvers[typeName] = {};
            for (const iFace of type.getInterfaces()){
                if (resolvers[iFace.name]) {
                    for(const fieldName in resolvers[iFace.name]){
                        if (fieldName === '__isTypeOf' || !fieldName.startsWith('__')) {
                            extendedResolvers[typeName][fieldName] = resolvers[iFace.name][fieldName];
                        }
                    }
                }
            }
            const typeResolvers = resolvers[typeName];
            extendedResolvers[typeName] = {
                ...extendedResolvers[typeName],
                ...typeResolvers
            };
        } else {
            const typeResolvers = resolvers[typeName];
            if (typeResolvers != null) {
                extendedResolvers[typeName] = typeResolvers;
            }
        }
    }
    return extendedResolvers;
}
}),
"[project]/node_modules/@graphql-tools/schema/esm/addResolversToSchema.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addResolversToSchema",
    ()=>addResolversToSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$definition$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/graphql/type/definition.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$scalars$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/graphql/type/scalars.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$forEachDefaultValue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@graphql-tools/utils/esm/forEachDefaultValue.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$forEachField$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@graphql-tools/utils/esm/forEachField.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$heal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@graphql-tools/utils/esm/heal.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$Interfaces$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@graphql-tools/utils/esm/Interfaces.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$mapSchema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@graphql-tools/utils/esm/mapSchema.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$transformInputValue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@graphql-tools/utils/esm/transformInputValue.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$schema$2f$esm$2f$checkForResolveTypeResolver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@graphql-tools/schema/esm/checkForResolveTypeResolver.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$schema$2f$esm$2f$extendResolversFromInterfaces$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@graphql-tools/schema/esm/extendResolversFromInterfaces.js [app-route] (ecmascript)");
;
;
;
;
function addResolversToSchema({ schema, resolvers: inputResolvers, defaultFieldResolver, resolverValidationOptions = {}, inheritResolversFromInterfaces = false, updateResolversInPlace = false }) {
    const { requireResolversToMatchSchema = 'error', requireResolversForResolveType } = resolverValidationOptions;
    const resolvers = inheritResolversFromInterfaces ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$schema$2f$esm$2f$extendResolversFromInterfaces$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extendResolversFromInterfaces"])(schema, inputResolvers) : inputResolvers;
    for(const typeName in resolvers){
        const resolverValue = resolvers[typeName];
        const resolverType = typeof resolverValue;
        if (resolverType !== 'object') {
            throw new Error(`"${typeName}" defined in resolvers, but has invalid value "${resolverValue}". The resolver's value must be of type object.`);
        }
        const type = schema.getType(typeName);
        if (type == null) {
            const msg = `"${typeName}" defined in resolvers, but not in schema`;
            if (requireResolversToMatchSchema && requireResolversToMatchSchema !== 'error') {
                if (requireResolversToMatchSchema === 'warn') {
                    console.warn(msg);
                }
                continue;
            }
            throw new Error(msg);
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$scalars$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSpecifiedScalarType"])(type)) {
            // allow -- without recommending -- overriding of specified scalar types
            for(const fieldName in resolverValue){
                if (fieldName.startsWith('__')) {
                    type[fieldName.substring(2)] = resolverValue[fieldName];
                } else {
                    type[fieldName] = resolverValue[fieldName];
                }
            }
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$definition$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isEnumType"])(type)) {
            const values = type.getValues();
            for(const fieldName in resolverValue){
                if (!fieldName.startsWith('__') && !values.some((value)=>value.name === fieldName) && requireResolversToMatchSchema && requireResolversToMatchSchema !== 'ignore') {
                    const msg = `${type.name}.${fieldName} was defined in resolvers, but not present within ${type.name}`;
                    if (requireResolversToMatchSchema === 'error') {
                        throw new Error(msg);
                    } else {
                        console.warn(msg);
                    }
                }
            }
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$definition$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isUnionType"])(type)) {
            for(const fieldName in resolverValue){
                if (!fieldName.startsWith('__') && requireResolversToMatchSchema && requireResolversToMatchSchema !== 'ignore') {
                    const msg = `${type.name}.${fieldName} was defined in resolvers, but ${type.name} is not an object or interface type`;
                    if (requireResolversToMatchSchema === 'error') {
                        throw new Error(msg);
                    } else {
                        console.warn(msg);
                    }
                }
            }
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$definition$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObjectType"])(type) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$definition$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isInterfaceType"])(type)) {
            for(const fieldName in resolverValue){
                if (!fieldName.startsWith('__')) {
                    const fields = type.getFields();
                    const field = fields[fieldName];
                    if (field == null) {
                        // Field present in resolver but not in schema
                        if (requireResolversToMatchSchema && requireResolversToMatchSchema !== 'ignore') {
                            const msg = `${typeName}.${fieldName} defined in resolvers, but not in schema`;
                            if (requireResolversToMatchSchema === 'error') {
                                throw new Error(msg);
                            } else {
                                console.error(msg);
                            }
                        }
                    } else {
                        // Field present in both the resolver and schema
                        const fieldResolve = resolverValue[fieldName];
                        if (typeof fieldResolve !== 'function' && typeof fieldResolve !== 'object') {
                            throw new Error(`Resolver ${typeName}.${fieldName} must be object or function`);
                        }
                    }
                }
            }
        }
    }
    schema = updateResolversInPlace ? addResolversToExistingSchema(schema, resolvers, defaultFieldResolver) : createNewSchemaWithResolvers(schema, resolvers, defaultFieldResolver);
    if (requireResolversForResolveType && requireResolversForResolveType !== 'ignore') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$schema$2f$esm$2f$checkForResolveTypeResolver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkForResolveTypeResolver"])(schema, requireResolversForResolveType);
    }
    return schema;
}
function addResolversToExistingSchema(schema, resolvers, defaultFieldResolver) {
    const typeMap = schema.getTypeMap();
    for(const typeName in resolvers){
        const type = schema.getType(typeName);
        const resolverValue = resolvers[typeName];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$definition$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isScalarType"])(type)) {
            for(const fieldName in resolverValue){
                if (fieldName.startsWith('__')) {
                    type[fieldName.substring(2)] = resolverValue[fieldName];
                } else if (fieldName === 'astNode' && type.astNode != null) {
                    type.astNode = {
                        ...type.astNode,
                        description: resolverValue?.astNode?.description ?? type.astNode.description,
                        directives: (type.astNode.directives ?? []).concat(resolverValue?.astNode?.directives ?? [])
                    };
                } else if (fieldName === 'extensionASTNodes' && type.extensionASTNodes != null) {
                    type.extensionASTNodes = type.extensionASTNodes.concat(resolverValue?.extensionASTNodes ?? []);
                } else if (fieldName === 'extensions' && type.extensions != null && resolverValue.extensions != null) {
                    type.extensions = Object.assign(Object.create(null), type.extensions, resolverValue.extensions);
                } else {
                    type[fieldName] = resolverValue[fieldName];
                }
            }
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$definition$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isEnumType"])(type)) {
            const config = type.toConfig();
            const enumValueConfigMap = config.values;
            for(const fieldName in resolverValue){
                if (fieldName.startsWith('__')) {
                    config[fieldName.substring(2)] = resolverValue[fieldName];
                } else if (fieldName === 'astNode' && config.astNode != null) {
                    config.astNode = {
                        ...config.astNode,
                        description: resolverValue?.astNode?.description ?? config.astNode.description,
                        directives: (config.astNode.directives ?? []).concat(resolverValue?.astNode?.directives ?? [])
                    };
                } else if (fieldName === 'extensionASTNodes' && config.extensionASTNodes != null) {
                    config.extensionASTNodes = config.extensionASTNodes.concat(resolverValue?.extensionASTNodes ?? []);
                } else if (fieldName === 'extensions' && type.extensions != null && resolverValue.extensions != null) {
                    type.extensions = Object.assign(Object.create(null), type.extensions, resolverValue.extensions);
                } else if (enumValueConfigMap[fieldName]) {
                    enumValueConfigMap[fieldName].value = resolverValue[fieldName];
                }
            }
            typeMap[typeName] = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$definition$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GraphQLEnumType"](config);
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$definition$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isUnionType"])(type)) {
            for(const fieldName in resolverValue){
                if (fieldName.startsWith('__')) {
                    type[fieldName.substring(2)] = resolverValue[fieldName];
                }
            }
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$definition$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObjectType"])(type) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$definition$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isInterfaceType"])(type)) {
            for(const fieldName in resolverValue){
                if (fieldName.startsWith('__')) {
                    // this is for isTypeOf and resolveType and all the other stuff.
                    type[fieldName.substring(2)] = resolverValue[fieldName];
                    continue;
                }
                const fields = type.getFields();
                const field = fields[fieldName];
                if (field != null) {
                    const fieldResolve = resolverValue[fieldName];
                    if (typeof fieldResolve === 'function') {
                        // for convenience. Allows shorter syntax in resolver definition file
                        field.resolve = fieldResolve.bind(resolverValue);
                    } else {
                        setFieldProperties(field, fieldResolve);
                    }
                }
            }
        }
    }
    // serialize all default values prior to healing fields with new scalar/enum types.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$forEachDefaultValue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forEachDefaultValue"])(schema, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$transformInputValue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializeInputValue"]);
    // schema may have new scalar/enum types that require healing
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$heal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["healSchema"])(schema);
    // reparse all default values with new parsing functions.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$forEachDefaultValue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forEachDefaultValue"])(schema, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$transformInputValue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseInputValue"]);
    if (defaultFieldResolver != null) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$forEachField$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forEachField"])(schema, (field)=>{
            if (!field.resolve) {
                field.resolve = defaultFieldResolver;
            }
        });
    }
    return schema;
}
function createNewSchemaWithResolvers(schema, resolvers, defaultFieldResolver) {
    schema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$mapSchema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapSchema"])(schema, {
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$Interfaces$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MapperKind"].SCALAR_TYPE]: (type)=>{
            const config = type.toConfig();
            const resolverValue = resolvers[type.name];
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$scalars$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSpecifiedScalarType"])(type) && resolverValue != null) {
                for(const fieldName in resolverValue){
                    if (fieldName.startsWith('__')) {
                        config[fieldName.substring(2)] = resolverValue[fieldName];
                    } else if (fieldName === 'astNode' && config.astNode != null) {
                        config.astNode = {
                            ...config.astNode,
                            description: resolverValue?.astNode?.description ?? config.astNode.description,
                            directives: (config.astNode.directives ?? []).concat(resolverValue?.astNode?.directives ?? [])
                        };
                    } else if (fieldName === 'extensionASTNodes' && config.extensionASTNodes != null) {
                        config.extensionASTNodes = config.extensionASTNodes.concat(resolverValue?.extensionASTNodes ?? []);
                    } else if (fieldName === 'extensions' && config.extensions != null && resolverValue.extensions != null) {
                        config.extensions = Object.assign(Object.create(null), type.extensions, resolverValue.extensions);
                    } else {
                        config[fieldName] = resolverValue[fieldName];
                    }
                }
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$definition$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GraphQLScalarType"](config);
            }
        },
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$Interfaces$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MapperKind"].ENUM_TYPE]: (type)=>{
            const resolverValue = resolvers[type.name];
            const config = type.toConfig();
            const enumValueConfigMap = config.values;
            if (resolverValue != null) {
                for(const fieldName in resolverValue){
                    if (fieldName.startsWith('__')) {
                        config[fieldName.substring(2)] = resolverValue[fieldName];
                    } else if (fieldName === 'astNode' && config.astNode != null) {
                        config.astNode = {
                            ...config.astNode,
                            description: resolverValue?.astNode?.description ?? config.astNode.description,
                            directives: (config.astNode.directives ?? []).concat(resolverValue?.astNode?.directives ?? [])
                        };
                    } else if (fieldName === 'extensionASTNodes' && config.extensionASTNodes != null) {
                        config.extensionASTNodes = config.extensionASTNodes.concat(resolverValue?.extensionASTNodes ?? []);
                    } else if (fieldName === 'extensions' && config.extensions != null && resolverValue.extensions != null) {
                        config.extensions = Object.assign(Object.create(null), type.extensions, resolverValue.extensions);
                    } else if (enumValueConfigMap[fieldName]) {
                        enumValueConfigMap[fieldName].value = resolverValue[fieldName];
                    }
                }
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$definition$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GraphQLEnumType"](config);
            }
        },
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$Interfaces$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MapperKind"].UNION_TYPE]: (type)=>{
            const resolverValue = resolvers[type.name];
            if (resolverValue != null) {
                const config = type.toConfig();
                if (resolverValue['__resolveType']) {
                    config.resolveType = resolverValue['__resolveType'];
                }
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$definition$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GraphQLUnionType"](config);
            }
        },
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$Interfaces$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MapperKind"].OBJECT_TYPE]: (type)=>{
            const resolverValue = resolvers[type.name];
            if (resolverValue != null) {
                const config = type.toConfig();
                if (resolverValue['__isTypeOf']) {
                    config.isTypeOf = resolverValue['__isTypeOf'];
                }
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$definition$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GraphQLObjectType"](config);
            }
        },
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$Interfaces$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MapperKind"].INTERFACE_TYPE]: (type)=>{
            const resolverValue = resolvers[type.name];
            if (resolverValue != null) {
                const config = type.toConfig();
                if (resolverValue['__resolveType']) {
                    config.resolveType = resolverValue['__resolveType'];
                }
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$definition$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GraphQLInterfaceType"](config);
            }
        },
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$Interfaces$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MapperKind"].COMPOSITE_FIELD]: (fieldConfig, fieldName, typeName)=>{
            const resolverValue = resolvers[typeName];
            if (resolverValue != null) {
                const fieldResolve = resolverValue[fieldName];
                if (fieldResolve != null) {
                    const newFieldConfig = {
                        ...fieldConfig
                    };
                    if (typeof fieldResolve === 'function') {
                        // for convenience. Allows shorter syntax in resolver definition file
                        newFieldConfig.resolve = fieldResolve.bind(resolverValue);
                    } else {
                        setFieldProperties(newFieldConfig, fieldResolve);
                    }
                    return newFieldConfig;
                }
            }
        }
    });
    if (defaultFieldResolver != null) {
        schema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$mapSchema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapSchema"])(schema, {
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$Interfaces$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MapperKind"].OBJECT_FIELD]: (fieldConfig)=>({
                    ...fieldConfig,
                    resolve: fieldConfig.resolve != null ? fieldConfig.resolve : defaultFieldResolver
                })
        });
    }
    return schema;
}
function setFieldProperties(field, propertiesObj) {
    for(const propertyName in propertiesObj){
        field[propertyName] = propertiesObj[propertyName];
    }
}
}),
"[project]/node_modules/@graphql-tools/schema/esm/assertResolversPresent.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assertResolversPresent",
    ()=>assertResolversPresent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$definition$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/graphql/type/definition.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$forEachField$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@graphql-tools/utils/esm/forEachField.js [app-route] (ecmascript)");
;
;
function assertResolversPresent(schema, resolverValidationOptions = {}) {
    const { requireResolversForArgs, requireResolversForNonScalar, requireResolversForAllFields } = resolverValidationOptions;
    if (requireResolversForAllFields && (requireResolversForArgs || requireResolversForNonScalar)) {
        throw new TypeError('requireResolversForAllFields takes precedence over the more specific assertions. ' + 'Please configure either requireResolversForAllFields or requireResolversForArgs / ' + 'requireResolversForNonScalar, but not a combination of them.');
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$forEachField$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forEachField"])(schema, (field, typeName, fieldName)=>{
        // requires a resolver for *every* field.
        if (requireResolversForAllFields) {
            expectResolver('requireResolversForAllFields', requireResolversForAllFields, field, typeName, fieldName);
        }
        // requires a resolver on every field that has arguments
        if (requireResolversForArgs && field.args.length > 0) {
            expectResolver('requireResolversForArgs', requireResolversForArgs, field, typeName, fieldName);
        }
        // requires a resolver on every field that returns a non-scalar type
        if (requireResolversForNonScalar !== 'ignore' && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$definition$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isScalarType"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$definition$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getNamedType"])(field.type))) {
            expectResolver('requireResolversForNonScalar', requireResolversForNonScalar, field, typeName, fieldName);
        }
    });
}
function expectResolver(validator, behavior, field, typeName, fieldName) {
    if (!field.resolve) {
        const message = `Resolver missing for "${typeName}.${fieldName}".
To disable this validator, use:
  resolverValidationOptions: {
    ${validator}: 'ignore'
  }`;
        if (behavior === 'error') {
            throw new Error(message);
        }
        if (behavior === 'warn') {
            console.warn(message);
        }
        return;
    }
    if (typeof field.resolve !== 'function') {
        throw new Error(`Resolver "${typeName}.${fieldName}" must be a function`);
    }
}
}),
"[project]/node_modules/@graphql-tools/schema/esm/makeExecutableSchema.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "makeExecutableSchema",
    ()=>makeExecutableSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$utilities$2f$buildASTSchema$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/graphql/utilities/buildASTSchema.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$schema$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/graphql/type/schema.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$merge$2f$esm$2f$extensions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@graphql-tools/merge/esm/extensions.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$merge$2f$esm$2f$merge$2d$resolvers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@graphql-tools/merge/esm/merge-resolvers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$merge$2f$esm$2f$typedefs$2d$mergers$2f$merge$2d$typedefs$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@graphql-tools/merge/esm/typedefs-mergers/merge-typedefs.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@graphql-tools/utils/esm/helpers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$schema$2f$esm$2f$addResolversToSchema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@graphql-tools/schema/esm/addResolversToSchema.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$schema$2f$esm$2f$assertResolversPresent$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@graphql-tools/schema/esm/assertResolversPresent.js [app-route] (ecmascript)");
;
;
;
;
;
function makeExecutableSchema({ typeDefs, resolvers = {}, resolverValidationOptions = {}, inheritResolversFromInterfaces = false, updateResolversInPlace = false, schemaExtensions, defaultFieldResolver, ...otherOptions }) {
    // Validate and clean up arguments
    if (typeof resolverValidationOptions !== 'object') {
        throw new Error('Expected `resolverValidationOptions` to be an object');
    }
    if (!typeDefs) {
        throw new Error('Must provide typeDefs');
    }
    let schema;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$type$2f$schema$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSchema"])(typeDefs)) {
        schema = typeDefs;
    } else if (otherOptions?.commentDescriptions) {
        const mergedTypeDefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$merge$2f$esm$2f$typedefs$2d$mergers$2f$merge$2d$typedefs$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mergeTypeDefs"])(typeDefs, {
            ...otherOptions,
            commentDescriptions: true
        });
        schema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$utilities$2f$buildASTSchema$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildSchema"])(mergedTypeDefs, otherOptions);
    } else {
        const mergedTypeDefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$merge$2f$esm$2f$typedefs$2d$mergers$2f$merge$2d$typedefs$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mergeTypeDefs"])(typeDefs, otherOptions);
        schema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$utilities$2f$buildASTSchema$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildASTSchema"])(mergedTypeDefs, otherOptions);
    }
    // We allow passing in an array of resolver maps, in which case we merge them
    schema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$schema$2f$esm$2f$addResolversToSchema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addResolversToSchema"])({
        schema,
        resolvers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$merge$2f$esm$2f$merge$2d$resolvers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mergeResolvers"])(resolvers),
        resolverValidationOptions,
        inheritResolversFromInterfaces,
        updateResolversInPlace,
        defaultFieldResolver
    });
    if (Object.keys(resolverValidationOptions).length > 0) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$schema$2f$esm$2f$assertResolversPresent$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["assertResolversPresent"])(schema, resolverValidationOptions);
    }
    if (schemaExtensions) {
        for (const schemaExtension of (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$utils$2f$esm$2f$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["asArray"])(schemaExtensions)){
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$graphql$2d$tools$2f$merge$2f$esm$2f$extensions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["applyExtensions"])(schema, schemaExtension);
        }
    }
    return schema;
}
}),
"[project]/node_modules/@graphql-tools/schema/cjs/assertResolversPresent.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assertResolversPresent = assertResolversPresent;
const graphql_1 = __turbopack_context__.r("[project]/node_modules/graphql/index.mjs [app-route] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/node_modules/@graphql-tools/utils/cjs/index.js [app-route] (ecmascript)");
function assertResolversPresent(schema, resolverValidationOptions = {}) {
    const { requireResolversForArgs, requireResolversForNonScalar, requireResolversForAllFields } = resolverValidationOptions;
    if (requireResolversForAllFields && (requireResolversForArgs || requireResolversForNonScalar)) {
        throw new TypeError('requireResolversForAllFields takes precedence over the more specific assertions. ' + 'Please configure either requireResolversForAllFields or requireResolversForArgs / ' + 'requireResolversForNonScalar, but not a combination of them.');
    }
    (0, utils_1.forEachField)(schema, (field, typeName, fieldName)=>{
        // requires a resolver for *every* field.
        if (requireResolversForAllFields) {
            expectResolver('requireResolversForAllFields', requireResolversForAllFields, field, typeName, fieldName);
        }
        // requires a resolver on every field that has arguments
        if (requireResolversForArgs && field.args.length > 0) {
            expectResolver('requireResolversForArgs', requireResolversForArgs, field, typeName, fieldName);
        }
        // requires a resolver on every field that returns a non-scalar type
        if (requireResolversForNonScalar !== 'ignore' && !(0, graphql_1.isScalarType)((0, graphql_1.getNamedType)(field.type))) {
            expectResolver('requireResolversForNonScalar', requireResolversForNonScalar, field, typeName, fieldName);
        }
    });
}
function expectResolver(validator, behavior, field, typeName, fieldName) {
    if (!field.resolve) {
        const message = `Resolver missing for "${typeName}.${fieldName}".
To disable this validator, use:
  resolverValidationOptions: {
    ${validator}: 'ignore'
  }`;
        if (behavior === 'error') {
            throw new Error(message);
        }
        if (behavior === 'warn') {
            console.warn(message);
        }
        return;
    }
    if (typeof field.resolve !== 'function') {
        throw new Error(`Resolver "${typeName}.${fieldName}" must be a function`);
    }
}
}),
"[project]/node_modules/@graphql-tools/schema/cjs/chainResolvers.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.chainResolvers = chainResolvers;
const graphql_1 = __turbopack_context__.r("[project]/node_modules/graphql/index.mjs [app-route] (ecmascript)");
function chainResolvers(resolvers) {
    return (root, args, ctx, info)=>resolvers.reduce((prev, curResolver)=>{
            if (curResolver != null) {
                return curResolver(prev, args, ctx, info);
            }
            return (0, graphql_1.defaultFieldResolver)(prev, args, ctx, info);
        }, root);
}
}),
"[project]/node_modules/@graphql-tools/schema/cjs/checkForResolveTypeResolver.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkForResolveTypeResolver = checkForResolveTypeResolver;
const utils_1 = __turbopack_context__.r("[project]/node_modules/@graphql-tools/utils/cjs/index.js [app-route] (ecmascript)");
// If we have any union or interface types throw if no there is no resolveType resolver
function checkForResolveTypeResolver(schema, requireResolversForResolveType) {
    (0, utils_1.mapSchema)(schema, {
        [utils_1.MapperKind.ABSTRACT_TYPE]: (type)=>{
            if (!type.resolveType) {
                const message = `Type "${type.name}" is missing a "__resolveType" resolver. Pass 'ignore' into ` + '"resolverValidationOptions.requireResolversForResolveType" to disable this error.';
                if (requireResolversForResolveType === 'error') {
                    throw new Error(message);
                }
                if (requireResolversForResolveType === 'warn') {
                    console.warn(message);
                }
            }
            return undefined;
        }
    });
}
}),
"[project]/node_modules/@graphql-tools/schema/cjs/extendResolversFromInterfaces.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.extendResolversFromInterfaces = extendResolversFromInterfaces;
function extendResolversFromInterfaces(schema, resolvers) {
    const extendedResolvers = {};
    const typeMap = schema.getTypeMap();
    for(const typeName in typeMap){
        const type = typeMap[typeName];
        if ('getInterfaces' in type) {
            extendedResolvers[typeName] = {};
            for (const iFace of type.getInterfaces()){
                if (resolvers[iFace.name]) {
                    for(const fieldName in resolvers[iFace.name]){
                        if (fieldName === '__isTypeOf' || !fieldName.startsWith('__')) {
                            extendedResolvers[typeName][fieldName] = resolvers[iFace.name][fieldName];
                        }
                    }
                }
            }
            const typeResolvers = resolvers[typeName];
            extendedResolvers[typeName] = {
                ...extendedResolvers[typeName],
                ...typeResolvers
            };
        } else {
            const typeResolvers = resolvers[typeName];
            if (typeResolvers != null) {
                extendedResolvers[typeName] = typeResolvers;
            }
        }
    }
    return extendedResolvers;
}
}),
"[project]/node_modules/@graphql-tools/schema/cjs/addResolversToSchema.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addResolversToSchema = addResolversToSchema;
const graphql_1 = __turbopack_context__.r("[project]/node_modules/graphql/index.mjs [app-route] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/node_modules/@graphql-tools/utils/cjs/index.js [app-route] (ecmascript)");
const checkForResolveTypeResolver_js_1 = __turbopack_context__.r("[project]/node_modules/@graphql-tools/schema/cjs/checkForResolveTypeResolver.js [app-route] (ecmascript)");
const extendResolversFromInterfaces_js_1 = __turbopack_context__.r("[project]/node_modules/@graphql-tools/schema/cjs/extendResolversFromInterfaces.js [app-route] (ecmascript)");
function addResolversToSchema({ schema, resolvers: inputResolvers, defaultFieldResolver, resolverValidationOptions = {}, inheritResolversFromInterfaces = false, updateResolversInPlace = false }) {
    const { requireResolversToMatchSchema = 'error', requireResolversForResolveType } = resolverValidationOptions;
    const resolvers = inheritResolversFromInterfaces ? (0, extendResolversFromInterfaces_js_1.extendResolversFromInterfaces)(schema, inputResolvers) : inputResolvers;
    for(const typeName in resolvers){
        const resolverValue = resolvers[typeName];
        const resolverType = typeof resolverValue;
        if (resolverType !== 'object') {
            throw new Error(`"${typeName}" defined in resolvers, but has invalid value "${resolverValue}". The resolver's value must be of type object.`);
        }
        const type = schema.getType(typeName);
        if (type == null) {
            const msg = `"${typeName}" defined in resolvers, but not in schema`;
            if (requireResolversToMatchSchema && requireResolversToMatchSchema !== 'error') {
                if (requireResolversToMatchSchema === 'warn') {
                    console.warn(msg);
                }
                continue;
            }
            throw new Error(msg);
        } else if ((0, graphql_1.isSpecifiedScalarType)(type)) {
            // allow -- without recommending -- overriding of specified scalar types
            for(const fieldName in resolverValue){
                if (fieldName.startsWith('__')) {
                    type[fieldName.substring(2)] = resolverValue[fieldName];
                } else {
                    type[fieldName] = resolverValue[fieldName];
                }
            }
        } else if ((0, graphql_1.isEnumType)(type)) {
            const values = type.getValues();
            for(const fieldName in resolverValue){
                if (!fieldName.startsWith('__') && !values.some((value)=>value.name === fieldName) && requireResolversToMatchSchema && requireResolversToMatchSchema !== 'ignore') {
                    const msg = `${type.name}.${fieldName} was defined in resolvers, but not present within ${type.name}`;
                    if (requireResolversToMatchSchema === 'error') {
                        throw new Error(msg);
                    } else {
                        console.warn(msg);
                    }
                }
            }
        } else if ((0, graphql_1.isUnionType)(type)) {
            for(const fieldName in resolverValue){
                if (!fieldName.startsWith('__') && requireResolversToMatchSchema && requireResolversToMatchSchema !== 'ignore') {
                    const msg = `${type.name}.${fieldName} was defined in resolvers, but ${type.name} is not an object or interface type`;
                    if (requireResolversToMatchSchema === 'error') {
                        throw new Error(msg);
                    } else {
                        console.warn(msg);
                    }
                }
            }
        } else if ((0, graphql_1.isObjectType)(type) || (0, graphql_1.isInterfaceType)(type)) {
            for(const fieldName in resolverValue){
                if (!fieldName.startsWith('__')) {
                    const fields = type.getFields();
                    const field = fields[fieldName];
                    if (field == null) {
                        // Field present in resolver but not in schema
                        if (requireResolversToMatchSchema && requireResolversToMatchSchema !== 'ignore') {
                            const msg = `${typeName}.${fieldName} defined in resolvers, but not in schema`;
                            if (requireResolversToMatchSchema === 'error') {
                                throw new Error(msg);
                            } else {
                                console.error(msg);
                            }
                        }
                    } else {
                        // Field present in both the resolver and schema
                        const fieldResolve = resolverValue[fieldName];
                        if (typeof fieldResolve !== 'function' && typeof fieldResolve !== 'object') {
                            throw new Error(`Resolver ${typeName}.${fieldName} must be object or function`);
                        }
                    }
                }
            }
        }
    }
    schema = updateResolversInPlace ? addResolversToExistingSchema(schema, resolvers, defaultFieldResolver) : createNewSchemaWithResolvers(schema, resolvers, defaultFieldResolver);
    if (requireResolversForResolveType && requireResolversForResolveType !== 'ignore') {
        (0, checkForResolveTypeResolver_js_1.checkForResolveTypeResolver)(schema, requireResolversForResolveType);
    }
    return schema;
}
function addResolversToExistingSchema(schema, resolvers, defaultFieldResolver) {
    const typeMap = schema.getTypeMap();
    for(const typeName in resolvers){
        const type = schema.getType(typeName);
        const resolverValue = resolvers[typeName];
        if ((0, graphql_1.isScalarType)(type)) {
            for(const fieldName in resolverValue){
                if (fieldName.startsWith('__')) {
                    type[fieldName.substring(2)] = resolverValue[fieldName];
                } else if (fieldName === 'astNode' && type.astNode != null) {
                    type.astNode = {
                        ...type.astNode,
                        description: resolverValue?.astNode?.description ?? type.astNode.description,
                        directives: (type.astNode.directives ?? []).concat(resolverValue?.astNode?.directives ?? [])
                    };
                } else if (fieldName === 'extensionASTNodes' && type.extensionASTNodes != null) {
                    type.extensionASTNodes = type.extensionASTNodes.concat(resolverValue?.extensionASTNodes ?? []);
                } else if (fieldName === 'extensions' && type.extensions != null && resolverValue.extensions != null) {
                    type.extensions = Object.assign(Object.create(null), type.extensions, resolverValue.extensions);
                } else {
                    type[fieldName] = resolverValue[fieldName];
                }
            }
        } else if ((0, graphql_1.isEnumType)(type)) {
            const config = type.toConfig();
            const enumValueConfigMap = config.values;
            for(const fieldName in resolverValue){
                if (fieldName.startsWith('__')) {
                    config[fieldName.substring(2)] = resolverValue[fieldName];
                } else if (fieldName === 'astNode' && config.astNode != null) {
                    config.astNode = {
                        ...config.astNode,
                        description: resolverValue?.astNode?.description ?? config.astNode.description,
                        directives: (config.astNode.directives ?? []).concat(resolverValue?.astNode?.directives ?? [])
                    };
                } else if (fieldName === 'extensionASTNodes' && config.extensionASTNodes != null) {
                    config.extensionASTNodes = config.extensionASTNodes.concat(resolverValue?.extensionASTNodes ?? []);
                } else if (fieldName === 'extensions' && type.extensions != null && resolverValue.extensions != null) {
                    type.extensions = Object.assign(Object.create(null), type.extensions, resolverValue.extensions);
                } else if (enumValueConfigMap[fieldName]) {
                    enumValueConfigMap[fieldName].value = resolverValue[fieldName];
                }
            }
            typeMap[typeName] = new graphql_1.GraphQLEnumType(config);
        } else if ((0, graphql_1.isUnionType)(type)) {
            for(const fieldName in resolverValue){
                if (fieldName.startsWith('__')) {
                    type[fieldName.substring(2)] = resolverValue[fieldName];
                }
            }
        } else if ((0, graphql_1.isObjectType)(type) || (0, graphql_1.isInterfaceType)(type)) {
            for(const fieldName in resolverValue){
                if (fieldName.startsWith('__')) {
                    // this is for isTypeOf and resolveType and all the other stuff.
                    type[fieldName.substring(2)] = resolverValue[fieldName];
                    continue;
                }
                const fields = type.getFields();
                const field = fields[fieldName];
                if (field != null) {
                    const fieldResolve = resolverValue[fieldName];
                    if (typeof fieldResolve === 'function') {
                        // for convenience. Allows shorter syntax in resolver definition file
                        field.resolve = fieldResolve.bind(resolverValue);
                    } else {
                        setFieldProperties(field, fieldResolve);
                    }
                }
            }
        }
    }
    // serialize all default values prior to healing fields with new scalar/enum types.
    (0, utils_1.forEachDefaultValue)(schema, utils_1.serializeInputValue);
    // schema may have new scalar/enum types that require healing
    (0, utils_1.healSchema)(schema);
    // reparse all default values with new parsing functions.
    (0, utils_1.forEachDefaultValue)(schema, utils_1.parseInputValue);
    if (defaultFieldResolver != null) {
        (0, utils_1.forEachField)(schema, (field)=>{
            if (!field.resolve) {
                field.resolve = defaultFieldResolver;
            }
        });
    }
    return schema;
}
function createNewSchemaWithResolvers(schema, resolvers, defaultFieldResolver) {
    schema = (0, utils_1.mapSchema)(schema, {
        [utils_1.MapperKind.SCALAR_TYPE]: (type)=>{
            const config = type.toConfig();
            const resolverValue = resolvers[type.name];
            if (!(0, graphql_1.isSpecifiedScalarType)(type) && resolverValue != null) {
                for(const fieldName in resolverValue){
                    if (fieldName.startsWith('__')) {
                        config[fieldName.substring(2)] = resolverValue[fieldName];
                    } else if (fieldName === 'astNode' && config.astNode != null) {
                        config.astNode = {
                            ...config.astNode,
                            description: resolverValue?.astNode?.description ?? config.astNode.description,
                            directives: (config.astNode.directives ?? []).concat(resolverValue?.astNode?.directives ?? [])
                        };
                    } else if (fieldName === 'extensionASTNodes' && config.extensionASTNodes != null) {
                        config.extensionASTNodes = config.extensionASTNodes.concat(resolverValue?.extensionASTNodes ?? []);
                    } else if (fieldName === 'extensions' && config.extensions != null && resolverValue.extensions != null) {
                        config.extensions = Object.assign(Object.create(null), type.extensions, resolverValue.extensions);
                    } else {
                        config[fieldName] = resolverValue[fieldName];
                    }
                }
                return new graphql_1.GraphQLScalarType(config);
            }
        },
        [utils_1.MapperKind.ENUM_TYPE]: (type)=>{
            const resolverValue = resolvers[type.name];
            const config = type.toConfig();
            const enumValueConfigMap = config.values;
            if (resolverValue != null) {
                for(const fieldName in resolverValue){
                    if (fieldName.startsWith('__')) {
                        config[fieldName.substring(2)] = resolverValue[fieldName];
                    } else if (fieldName === 'astNode' && config.astNode != null) {
                        config.astNode = {
                            ...config.astNode,
                            description: resolverValue?.astNode?.description ?? config.astNode.description,
                            directives: (config.astNode.directives ?? []).concat(resolverValue?.astNode?.directives ?? [])
                        };
                    } else if (fieldName === 'extensionASTNodes' && config.extensionASTNodes != null) {
                        config.extensionASTNodes = config.extensionASTNodes.concat(resolverValue?.extensionASTNodes ?? []);
                    } else if (fieldName === 'extensions' && config.extensions != null && resolverValue.extensions != null) {
                        config.extensions = Object.assign(Object.create(null), type.extensions, resolverValue.extensions);
                    } else if (enumValueConfigMap[fieldName]) {
                        enumValueConfigMap[fieldName].value = resolverValue[fieldName];
                    }
                }
                return new graphql_1.GraphQLEnumType(config);
            }
        },
        [utils_1.MapperKind.UNION_TYPE]: (type)=>{
            const resolverValue = resolvers[type.name];
            if (resolverValue != null) {
                const config = type.toConfig();
                if (resolverValue['__resolveType']) {
                    config.resolveType = resolverValue['__resolveType'];
                }
                return new graphql_1.GraphQLUnionType(config);
            }
        },
        [utils_1.MapperKind.OBJECT_TYPE]: (type)=>{
            const resolverValue = resolvers[type.name];
            if (resolverValue != null) {
                const config = type.toConfig();
                if (resolverValue['__isTypeOf']) {
                    config.isTypeOf = resolverValue['__isTypeOf'];
                }
                return new graphql_1.GraphQLObjectType(config);
            }
        },
        [utils_1.MapperKind.INTERFACE_TYPE]: (type)=>{
            const resolverValue = resolvers[type.name];
            if (resolverValue != null) {
                const config = type.toConfig();
                if (resolverValue['__resolveType']) {
                    config.resolveType = resolverValue['__resolveType'];
                }
                return new graphql_1.GraphQLInterfaceType(config);
            }
        },
        [utils_1.MapperKind.COMPOSITE_FIELD]: (fieldConfig, fieldName, typeName)=>{
            const resolverValue = resolvers[typeName];
            if (resolverValue != null) {
                const fieldResolve = resolverValue[fieldName];
                if (fieldResolve != null) {
                    const newFieldConfig = {
                        ...fieldConfig
                    };
                    if (typeof fieldResolve === 'function') {
                        // for convenience. Allows shorter syntax in resolver definition file
                        newFieldConfig.resolve = fieldResolve.bind(resolverValue);
                    } else {
                        setFieldProperties(newFieldConfig, fieldResolve);
                    }
                    return newFieldConfig;
                }
            }
        }
    });
    if (defaultFieldResolver != null) {
        schema = (0, utils_1.mapSchema)(schema, {
            [utils_1.MapperKind.OBJECT_FIELD]: (fieldConfig)=>({
                    ...fieldConfig,
                    resolve: fieldConfig.resolve != null ? fieldConfig.resolve : defaultFieldResolver
                })
        });
    }
    return schema;
}
function setFieldProperties(field, propertiesObj) {
    for(const propertyName in propertiesObj){
        field[propertyName] = propertiesObj[propertyName];
    }
}
}),
"[project]/node_modules/@graphql-tools/schema/cjs/makeExecutableSchema.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeExecutableSchema = makeExecutableSchema;
const graphql_1 = __turbopack_context__.r("[project]/node_modules/graphql/index.mjs [app-route] (ecmascript)");
const merge_1 = __turbopack_context__.r("[project]/node_modules/@graphql-tools/merge/cjs/index.js [app-route] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/node_modules/@graphql-tools/utils/cjs/index.js [app-route] (ecmascript)");
const addResolversToSchema_js_1 = __turbopack_context__.r("[project]/node_modules/@graphql-tools/schema/cjs/addResolversToSchema.js [app-route] (ecmascript)");
const assertResolversPresent_js_1 = __turbopack_context__.r("[project]/node_modules/@graphql-tools/schema/cjs/assertResolversPresent.js [app-route] (ecmascript)");
/**
 * Builds a schema from the provided type definitions and resolvers.
 *
 * The type definitions are written using Schema Definition Language (SDL). They
 * can be provided as a string, a `DocumentNode`, a function, or an array of any
 * of these. If a function is provided, it will be passed no arguments and
 * should return an array of strings or `DocumentNode`s.
 *
 * Note: You can use GraphQL magic comment provide additional syntax
 * highlighting in your editor (with the appropriate editor plugin).
 *
 * ```js
 * const typeDefs = /* GraphQL *\/ `
 *   type Query {
 *     posts: [Post]
 *     author(id: Int!): Author
 *   }
 * `;
 * ```
 *
 * The `resolvers` object should be a map of type names to nested object, which
 * themselves map the type's fields to their appropriate resolvers.
 * See the [Resolvers](/docs/resolvers) section of the documentation for more details.
 *
 * ```js
 * const resolvers = {
 *   Query: {
 *     posts: (obj, args, ctx, info) => getAllPosts(),
 *     author: (obj, args, ctx, info) => getAuthorById(args.id)
 *   }
 * };
 * ```
 *
 * Once you've defined both the `typeDefs` and `resolvers`, you can create your
 * schema:
 *
 * ```js
 * const schema = makeExecutableSchema({
 *   typeDefs,
 *   resolvers,
 * })
 * ```
 */ function makeExecutableSchema({ typeDefs, resolvers = {}, resolverValidationOptions = {}, inheritResolversFromInterfaces = false, updateResolversInPlace = false, schemaExtensions, defaultFieldResolver, ...otherOptions }) {
    // Validate and clean up arguments
    if (typeof resolverValidationOptions !== 'object') {
        throw new Error('Expected `resolverValidationOptions` to be an object');
    }
    if (!typeDefs) {
        throw new Error('Must provide typeDefs');
    }
    let schema;
    if ((0, graphql_1.isSchema)(typeDefs)) {
        schema = typeDefs;
    } else if (otherOptions?.commentDescriptions) {
        const mergedTypeDefs = (0, merge_1.mergeTypeDefs)(typeDefs, {
            ...otherOptions,
            commentDescriptions: true
        });
        schema = (0, graphql_1.buildSchema)(mergedTypeDefs, otherOptions);
    } else {
        const mergedTypeDefs = (0, merge_1.mergeTypeDefs)(typeDefs, otherOptions);
        schema = (0, graphql_1.buildASTSchema)(mergedTypeDefs, otherOptions);
    }
    // We allow passing in an array of resolver maps, in which case we merge them
    schema = (0, addResolversToSchema_js_1.addResolversToSchema)({
        schema,
        resolvers: (0, merge_1.mergeResolvers)(resolvers),
        resolverValidationOptions,
        inheritResolversFromInterfaces,
        updateResolversInPlace,
        defaultFieldResolver
    });
    if (Object.keys(resolverValidationOptions).length > 0) {
        (0, assertResolversPresent_js_1.assertResolversPresent)(schema, resolverValidationOptions);
    }
    if (schemaExtensions) {
        for (const schemaExtension of (0, utils_1.asArray)(schemaExtensions)){
            (0, merge_1.applyExtensions)(schema, schemaExtension);
        }
    }
    return schema;
}
}),
"[project]/node_modules/@graphql-tools/schema/cjs/types.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/node_modules/@graphql-tools/schema/cjs/merge-schemas.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mergeSchemas = mergeSchemas;
const utils_1 = __turbopack_context__.r("[project]/node_modules/@graphql-tools/utils/cjs/index.js [app-route] (ecmascript)");
const makeExecutableSchema_js_1 = __turbopack_context__.r("[project]/node_modules/@graphql-tools/schema/cjs/makeExecutableSchema.js [app-route] (ecmascript)");
/**
 * Synchronously merges multiple schemas, typeDefinitions and/or resolvers into a single schema.
 * @param config Configuration object
 */ function mergeSchemas(config) {
    const extractedTypeDefs = [];
    const extractedResolvers = [];
    const extractedSchemaExtensions = [];
    if (config.schemas != null) {
        for (const schema of config.schemas){
            extractedTypeDefs.push((0, utils_1.getDocumentNodeFromSchema)(schema));
            extractedResolvers.push((0, utils_1.getResolversFromSchema)(schema));
            extractedSchemaExtensions.push((0, utils_1.extractExtensionsFromSchema)(schema));
        }
    }
    if (config.typeDefs != null) {
        extractedTypeDefs.push(config.typeDefs);
    }
    if (config.resolvers != null) {
        const additionalResolvers = (0, utils_1.asArray)(config.resolvers);
        extractedResolvers.push(...additionalResolvers);
    }
    if (config.schemaExtensions != null) {
        const additionalSchemaExtensions = (0, utils_1.asArray)(config.schemaExtensions);
        extractedSchemaExtensions.push(...additionalSchemaExtensions);
    }
    return (0, makeExecutableSchema_js_1.makeExecutableSchema)({
        ...config,
        typeDefs: extractedTypeDefs,
        resolvers: extractedResolvers,
        schemaExtensions: extractedSchemaExtensions
    });
}
}),
"[project]/node_modules/@graphql-tools/schema/cjs/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.extractExtensionsFromSchema = exports.extendResolversFromInterfaces = exports.checkForResolveTypeResolver = exports.addResolversToSchema = exports.chainResolvers = exports.assertResolversPresent = void 0;
const tslib_1 = __turbopack_context__.r("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var assertResolversPresent_js_1 = __turbopack_context__.r("[project]/node_modules/@graphql-tools/schema/cjs/assertResolversPresent.js [app-route] (ecmascript)");
Object.defineProperty(exports, "assertResolversPresent", {
    enumerable: true,
    get: function() {
        return assertResolversPresent_js_1.assertResolversPresent;
    }
});
var chainResolvers_js_1 = __turbopack_context__.r("[project]/node_modules/@graphql-tools/schema/cjs/chainResolvers.js [app-route] (ecmascript)");
Object.defineProperty(exports, "chainResolvers", {
    enumerable: true,
    get: function() {
        return chainResolvers_js_1.chainResolvers;
    }
});
var addResolversToSchema_js_1 = __turbopack_context__.r("[project]/node_modules/@graphql-tools/schema/cjs/addResolversToSchema.js [app-route] (ecmascript)");
Object.defineProperty(exports, "addResolversToSchema", {
    enumerable: true,
    get: function() {
        return addResolversToSchema_js_1.addResolversToSchema;
    }
});
var checkForResolveTypeResolver_js_1 = __turbopack_context__.r("[project]/node_modules/@graphql-tools/schema/cjs/checkForResolveTypeResolver.js [app-route] (ecmascript)");
Object.defineProperty(exports, "checkForResolveTypeResolver", {
    enumerable: true,
    get: function() {
        return checkForResolveTypeResolver_js_1.checkForResolveTypeResolver;
    }
});
var extendResolversFromInterfaces_js_1 = __turbopack_context__.r("[project]/node_modules/@graphql-tools/schema/cjs/extendResolversFromInterfaces.js [app-route] (ecmascript)");
Object.defineProperty(exports, "extendResolversFromInterfaces", {
    enumerable: true,
    get: function() {
        return extendResolversFromInterfaces_js_1.extendResolversFromInterfaces;
    }
});
tslib_1.__exportStar(__turbopack_context__.r("[project]/node_modules/@graphql-tools/schema/cjs/makeExecutableSchema.js [app-route] (ecmascript)"), exports);
tslib_1.__exportStar(__turbopack_context__.r("[project]/node_modules/@graphql-tools/schema/cjs/types.js [app-route] (ecmascript)"), exports);
tslib_1.__exportStar(__turbopack_context__.r("[project]/node_modules/@graphql-tools/schema/cjs/merge-schemas.js [app-route] (ecmascript)"), exports);
var utils_1 = __turbopack_context__.r("[project]/node_modules/@graphql-tools/utils/cjs/index.js [app-route] (ecmascript)");
Object.defineProperty(exports, "extractExtensionsFromSchema", {
    enumerable: true,
    get: function() {
        return utils_1.extractExtensionsFromSchema;
    }
});
}),
"[project]/node_modules/loglevel/lib/loglevel.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/ (function(root, definition) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        ((r)=>r !== undefined && __turbopack_context__.v(r))(definition(__turbopack_context__.r, exports, module));
    } else if (("TURBOPACK compile-time value", "object") === 'object' && module.exports) {
        module.exports = definition();
    } else {
        root.log = definition();
    }
})(/*TURBOPACK member replacement*/ __turbopack_context__.e, function() {
    "use strict";
    // Slightly dubious tricks to cut down minimized file size
    var noop = function() {};
    var undefinedType = "undefined";
    var isIE = ("TURBOPACK compile-time value", "undefined") !== undefinedType && typeof window.navigator !== undefinedType && /Trident\/|MSIE /.test(window.navigator.userAgent);
    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];
    var _loggersByName = {};
    var defaultLogger = null;
    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
            return method.bind(obj);
        } else {
            try {
                return Function.prototype.bind.call(method, obj);
            } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function() {
                    return Function.prototype.apply.apply(method, [
                        obj,
                        arguments
                    ]);
                };
            }
        }
    }
    // Trace() doesn't print the message in IE, so for that case we need to wrap it
    function traceForIE() {
        if (console.log) {
            if (console.log.apply) {
                console.log.apply(console, arguments);
            } else {
                // In old IE, native console methods themselves don't have apply().
                Function.prototype.apply.apply(console.log, [
                    console,
                    arguments
                ]);
            }
        }
        if (console.trace) console.trace();
    }
    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
        if (methodName === 'debug') {
            methodName = 'log';
        }
        if (typeof console === undefinedType) {
            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
        } else if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }
    // These private functions always need `this` to be set properly
    function replaceLoggingMethods() {
        /*jshint validthis:true */ var level = this.getLevel();
        // Replace the actual methods.
        for(var i = 0; i < logMethods.length; i++){
            var methodName = logMethods[i];
            this[methodName] = i < level ? noop : this.methodFactory(methodName, level, this.name);
        }
        // Define log.log as an alias for log.debug
        this.log = this.debug;
        // Return any important warnings.
        if (typeof console === undefinedType && level < this.levels.SILENT) {
            return "No console available for logging";
        }
    }
    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName) {
        return function() {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this);
                this[methodName].apply(this, arguments);
            }
        };
    }
    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, _level, _loggerName) {
        /*jshint validthis:true */ return realMethod(methodName) || enableLoggingWhenConsoleArrives.apply(this, arguments);
    }
    function Logger(name, factory) {
        // Private instance variables.
        var self = this;
        /**
       * The level inherited from a parent logger (or a global default). We
       * cache this here rather than delegating to the parent so that it stays
       * in sync with the actual logging methods that we have installed (the
       * parent could change levels but we might not have rebuilt the loggers
       * in this child yet).
       * @type {number}
       */ var inheritedLevel;
        /**
       * The default level for this logger, if any. If set, this overrides
       * `inheritedLevel`.
       * @type {number|null}
       */ var defaultLevel;
        /**
       * A user-specific level for this logger. If set, this overrides
       * `defaultLevel`.
       * @type {number|null}
       */ var userLevel;
        var storageKey = "loglevel";
        if (typeof name === "string") {
            storageKey += ":" + name;
        } else if (typeof name === "symbol") {
            storageKey = undefined;
        }
        function persistLevelIfPossible(levelNum) {
            var levelName = (logMethods[levelNum] || 'silent').toUpperCase();
            if ("TURBOPACK compile-time truthy", 1) return;
            //TURBOPACK unreachable
            ;
        }
        function getPersistedLevel() {
            var storedLevel;
            if ("TURBOPACK compile-time truthy", 1) return;
            //TURBOPACK unreachable
            ;
            var cookie;
            var cookieName;
            var location;
        }
        function clearPersistedLevel() {
            if ("TURBOPACK compile-time truthy", 1) return;
            //TURBOPACK unreachable
            ;
        }
        function normalizeLevel(input) {
            var level = input;
            if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
                level = self.levels[level.toUpperCase()];
            }
            if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
                return level;
            } else {
                throw new TypeError("log.setLevel() called with invalid level: " + input);
            }
        }
        /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */ self.name = name;
        self.levels = {
            "TRACE": 0,
            "DEBUG": 1,
            "INFO": 2,
            "WARN": 3,
            "ERROR": 4,
            "SILENT": 5
        };
        self.methodFactory = factory || defaultMethodFactory;
        self.getLevel = function() {
            if (userLevel != null) {
                return userLevel;
            } else if (defaultLevel != null) {
                return defaultLevel;
            } else {
                return inheritedLevel;
            }
        };
        self.setLevel = function(level, persist) {
            userLevel = normalizeLevel(level);
            if (persist !== false) {
                persistLevelIfPossible(userLevel);
            }
            // NOTE: in v2, this should call rebuild(), which updates children.
            return replaceLoggingMethods.call(self);
        };
        self.setDefaultLevel = function(level) {
            defaultLevel = normalizeLevel(level);
            if (!getPersistedLevel()) {
                self.setLevel(level, false);
            }
        };
        self.resetLevel = function() {
            userLevel = null;
            clearPersistedLevel();
            replaceLoggingMethods.call(self);
        };
        self.enableAll = function(persist) {
            self.setLevel(self.levels.TRACE, persist);
        };
        self.disableAll = function(persist) {
            self.setLevel(self.levels.SILENT, persist);
        };
        self.rebuild = function() {
            if (defaultLogger !== self) {
                inheritedLevel = normalizeLevel(defaultLogger.getLevel());
            }
            replaceLoggingMethods.call(self);
            if (defaultLogger === self) {
                for(var childName in _loggersByName){
                    _loggersByName[childName].rebuild();
                }
            }
        };
        // Initialize all the internal levels.
        inheritedLevel = normalizeLevel(defaultLogger ? defaultLogger.getLevel() : "WARN");
        var initialLevel = getPersistedLevel();
        if (initialLevel != null) {
            userLevel = normalizeLevel(initialLevel);
        }
        replaceLoggingMethods.call(self);
    }
    /*
     *
     * Top-level API
     *
     */ defaultLogger = new Logger();
    defaultLogger.getLogger = function getLogger(name) {
        if (typeof name !== "symbol" && typeof name !== "string" || name === "") {
            throw new TypeError("You must supply a name when creating a logger.");
        }
        var logger = _loggersByName[name];
        if (!logger) {
            logger = _loggersByName[name] = new Logger(name, defaultLogger.methodFactory);
        }
        return logger;
    };
    // Grab the current global log variable in case of overwrite
    var _log = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : undefined;
    defaultLogger.noConflict = function() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return defaultLogger;
    };
    defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
    };
    // ES6 default export, for compatibility
    defaultLogger['default'] = defaultLogger;
    return defaultLogger;
});
}),
"[project]/node_modules/negotiator/lib/charset.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */ /**
 * Module exports.
 * @public
 */ module.exports = preferredCharsets;
module.exports.preferredCharsets = preferredCharsets;
/**
 * Module variables.
 * @private
 */ var simpleCharsetRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
/**
 * Parse the Accept-Charset header.
 * @private
 */ function parseAcceptCharset(accept) {
    var accepts = accept.split(',');
    for(var i = 0, j = 0; i < accepts.length; i++){
        var charset = parseCharset(accepts[i].trim(), i);
        if (charset) {
            accepts[j++] = charset;
        }
    }
    // trim accepts
    accepts.length = j;
    return accepts;
}
/**
 * Parse a charset from the Accept-Charset header.
 * @private
 */ function parseCharset(str, i) {
    var match = simpleCharsetRegExp.exec(str);
    if (!match) return null;
    var charset = match[1];
    var q = 1;
    if (match[2]) {
        var params = match[2].split(';');
        for(var j = 0; j < params.length; j++){
            var p = params[j].trim().split('=');
            if (p[0] === 'q') {
                q = parseFloat(p[1]);
                break;
            }
        }
    }
    return {
        charset: charset,
        q: q,
        i: i
    };
}
/**
 * Get the priority of a charset.
 * @private
 */ function getCharsetPriority(charset, accepted, index) {
    var priority = {
        o: -1,
        q: 0,
        s: 0
    };
    for(var i = 0; i < accepted.length; i++){
        var spec = specify(charset, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
            priority = spec;
        }
    }
    return priority;
}
/**
 * Get the specificity of the charset.
 * @private
 */ function specify(charset, spec, index) {
    var s = 0;
    if (spec.charset.toLowerCase() === charset.toLowerCase()) {
        s |= 1;
    } else if (spec.charset !== '*') {
        return null;
    }
    return {
        i: index,
        o: spec.i,
        q: spec.q,
        s: s
    };
}
/**
 * Get the preferred charsets from an Accept-Charset header.
 * @public
 */ function preferredCharsets(accept, provided) {
    // RFC 2616 sec 14.2: no header = *
    var accepts = parseAcceptCharset(accept === undefined ? '*' : accept || '');
    if (!provided) {
        // sorted list of all charsets
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullCharset);
    }
    var priorities = provided.map(function getPriority(type, index) {
        return getCharsetPriority(type, accepts, index);
    });
    // sorted list of accepted charsets
    return priorities.filter(isQuality).sort(compareSpecs).map(function getCharset(priority) {
        return provided[priorities.indexOf(priority)];
    });
}
/**
 * Compare two specs.
 * @private
 */ function compareSpecs(a, b) {
    return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
}
/**
 * Get full charset string.
 * @private
 */ function getFullCharset(spec) {
    return spec.charset;
}
/**
 * Check if a spec has any quality.
 * @private
 */ function isQuality(spec) {
    return spec.q > 0;
}
}),
"[project]/node_modules/negotiator/lib/encoding.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */ /**
 * Module exports.
 * @public
 */ module.exports = preferredEncodings;
module.exports.preferredEncodings = preferredEncodings;
/**
 * Module variables.
 * @private
 */ var simpleEncodingRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
/**
 * Parse the Accept-Encoding header.
 * @private
 */ function parseAcceptEncoding(accept) {
    var accepts = accept.split(',');
    var hasIdentity = false;
    var minQuality = 1;
    for(var i = 0, j = 0; i < accepts.length; i++){
        var encoding = parseEncoding(accepts[i].trim(), i);
        if (encoding) {
            accepts[j++] = encoding;
            hasIdentity = hasIdentity || specify('identity', encoding);
            minQuality = Math.min(minQuality, encoding.q || 1);
        }
    }
    if (!hasIdentity) {
        /*
     * If identity doesn't explicitly appear in the accept-encoding header,
     * it's added to the list of acceptable encoding with the lowest q
     */ accepts[j++] = {
            encoding: 'identity',
            q: minQuality,
            i: i
        };
    }
    // trim accepts
    accepts.length = j;
    return accepts;
}
/**
 * Parse an encoding from the Accept-Encoding header.
 * @private
 */ function parseEncoding(str, i) {
    var match = simpleEncodingRegExp.exec(str);
    if (!match) return null;
    var encoding = match[1];
    var q = 1;
    if (match[2]) {
        var params = match[2].split(';');
        for(var j = 0; j < params.length; j++){
            var p = params[j].trim().split('=');
            if (p[0] === 'q') {
                q = parseFloat(p[1]);
                break;
            }
        }
    }
    return {
        encoding: encoding,
        q: q,
        i: i
    };
}
/**
 * Get the priority of an encoding.
 * @private
 */ function getEncodingPriority(encoding, accepted, index) {
    var priority = {
        encoding: encoding,
        o: -1,
        q: 0,
        s: 0
    };
    for(var i = 0; i < accepted.length; i++){
        var spec = specify(encoding, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
            priority = spec;
        }
    }
    return priority;
}
/**
 * Get the specificity of the encoding.
 * @private
 */ function specify(encoding, spec, index) {
    var s = 0;
    if (spec.encoding.toLowerCase() === encoding.toLowerCase()) {
        s |= 1;
    } else if (spec.encoding !== '*') {
        return null;
    }
    return {
        encoding: encoding,
        i: index,
        o: spec.i,
        q: spec.q,
        s: s
    };
}
;
/**
 * Get the preferred encodings from an Accept-Encoding header.
 * @public
 */ function preferredEncodings(accept, provided, preferred) {
    var accepts = parseAcceptEncoding(accept || '');
    var comparator = preferred ? function comparator(a, b) {
        if (a.q !== b.q) {
            return b.q - a.q // higher quality first
            ;
        }
        var aPreferred = preferred.indexOf(a.encoding);
        var bPreferred = preferred.indexOf(b.encoding);
        if (aPreferred === -1 && bPreferred === -1) {
            // consider the original specifity/order
            return b.s - a.s || a.o - b.o || a.i - b.i;
        }
        if (aPreferred !== -1 && bPreferred !== -1) {
            return aPreferred - bPreferred // consider the preferred order
            ;
        }
        return aPreferred === -1 ? 1 : -1 // preferred first
        ;
    } : compareSpecs;
    if (!provided) {
        // sorted list of all encodings
        return accepts.filter(isQuality).sort(comparator).map(getFullEncoding);
    }
    var priorities = provided.map(function getPriority(type, index) {
        return getEncodingPriority(type, accepts, index);
    });
    // sorted list of accepted encodings
    return priorities.filter(isQuality).sort(comparator).map(function getEncoding(priority) {
        return provided[priorities.indexOf(priority)];
    });
}
/**
 * Compare two specs.
 * @private
 */ function compareSpecs(a, b) {
    return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i;
}
/**
 * Get full encoding string.
 * @private
 */ function getFullEncoding(spec) {
    return spec.encoding;
}
/**
 * Check if a spec has any quality.
 * @private
 */ function isQuality(spec) {
    return spec.q > 0;
}
}),
"[project]/node_modules/negotiator/lib/language.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */ /**
 * Module exports.
 * @public
 */ module.exports = preferredLanguages;
module.exports.preferredLanguages = preferredLanguages;
/**
 * Module variables.
 * @private
 */ var simpleLanguageRegExp = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
/**
 * Parse the Accept-Language header.
 * @private
 */ function parseAcceptLanguage(accept) {
    var accepts = accept.split(',');
    for(var i = 0, j = 0; i < accepts.length; i++){
        var language = parseLanguage(accepts[i].trim(), i);
        if (language) {
            accepts[j++] = language;
        }
    }
    // trim accepts
    accepts.length = j;
    return accepts;
}
/**
 * Parse a language from the Accept-Language header.
 * @private
 */ function parseLanguage(str, i) {
    var match = simpleLanguageRegExp.exec(str);
    if (!match) return null;
    var prefix = match[1];
    var suffix = match[2];
    var full = prefix;
    if (suffix) full += "-" + suffix;
    var q = 1;
    if (match[3]) {
        var params = match[3].split(';');
        for(var j = 0; j < params.length; j++){
            var p = params[j].split('=');
            if (p[0] === 'q') q = parseFloat(p[1]);
        }
    }
    return {
        prefix: prefix,
        suffix: suffix,
        q: q,
        i: i,
        full: full
    };
}
/**
 * Get the priority of a language.
 * @private
 */ function getLanguagePriority(language, accepted, index) {
    var priority = {
        o: -1,
        q: 0,
        s: 0
    };
    for(var i = 0; i < accepted.length; i++){
        var spec = specify(language, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
            priority = spec;
        }
    }
    return priority;
}
/**
 * Get the specificity of the language.
 * @private
 */ function specify(language, spec, index) {
    var p = parseLanguage(language);
    if (!p) return null;
    var s = 0;
    if (spec.full.toLowerCase() === p.full.toLowerCase()) {
        s |= 4;
    } else if (spec.prefix.toLowerCase() === p.full.toLowerCase()) {
        s |= 2;
    } else if (spec.full.toLowerCase() === p.prefix.toLowerCase()) {
        s |= 1;
    } else if (spec.full !== '*') {
        return null;
    }
    return {
        i: index,
        o: spec.i,
        q: spec.q,
        s: s
    };
}
;
/**
 * Get the preferred languages from an Accept-Language header.
 * @public
 */ function preferredLanguages(accept, provided) {
    // RFC 2616 sec 14.4: no header = *
    var accepts = parseAcceptLanguage(accept === undefined ? '*' : accept || '');
    if (!provided) {
        // sorted list of all languages
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullLanguage);
    }
    var priorities = provided.map(function getPriority(type, index) {
        return getLanguagePriority(type, accepts, index);
    });
    // sorted list of accepted languages
    return priorities.filter(isQuality).sort(compareSpecs).map(function getLanguage(priority) {
        return provided[priorities.indexOf(priority)];
    });
}
/**
 * Compare two specs.
 * @private
 */ function compareSpecs(a, b) {
    return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
}
/**
 * Get full language string.
 * @private
 */ function getFullLanguage(spec) {
    return spec.full;
}
/**
 * Check if a spec has any quality.
 * @private
 */ function isQuality(spec) {
    return spec.q > 0;
}
}),
"[project]/node_modules/negotiator/lib/mediaType.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */ /**
 * Module exports.
 * @public
 */ module.exports = preferredMediaTypes;
module.exports.preferredMediaTypes = preferredMediaTypes;
/**
 * Module variables.
 * @private
 */ var simpleMediaTypeRegExp = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
/**
 * Parse the Accept header.
 * @private
 */ function parseAccept(accept) {
    var accepts = splitMediaTypes(accept);
    for(var i = 0, j = 0; i < accepts.length; i++){
        var mediaType = parseMediaType(accepts[i].trim(), i);
        if (mediaType) {
            accepts[j++] = mediaType;
        }
    }
    // trim accepts
    accepts.length = j;
    return accepts;
}
/**
 * Parse a media type from the Accept header.
 * @private
 */ function parseMediaType(str, i) {
    var match = simpleMediaTypeRegExp.exec(str);
    if (!match) return null;
    var params = Object.create(null);
    var q = 1;
    var subtype = match[2];
    var type = match[1];
    if (match[3]) {
        var kvps = splitParameters(match[3]).map(splitKeyValuePair);
        for(var j = 0; j < kvps.length; j++){
            var pair = kvps[j];
            var key = pair[0].toLowerCase();
            var val = pair[1];
            // get the value, unwrapping quotes
            var value = val && val[0] === '"' && val[val.length - 1] === '"' ? val.slice(1, -1) : val;
            if (key === 'q') {
                q = parseFloat(value);
                break;
            }
            // store parameter
            params[key] = value;
        }
    }
    return {
        type: type,
        subtype: subtype,
        params: params,
        q: q,
        i: i
    };
}
/**
 * Get the priority of a media type.
 * @private
 */ function getMediaTypePriority(type, accepted, index) {
    var priority = {
        o: -1,
        q: 0,
        s: 0
    };
    for(var i = 0; i < accepted.length; i++){
        var spec = specify(type, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
            priority = spec;
        }
    }
    return priority;
}
/**
 * Get the specificity of the media type.
 * @private
 */ function specify(type, spec, index) {
    var p = parseMediaType(type);
    var s = 0;
    if (!p) {
        return null;
    }
    if (spec.type.toLowerCase() == p.type.toLowerCase()) {
        s |= 4;
    } else if (spec.type != '*') {
        return null;
    }
    if (spec.subtype.toLowerCase() == p.subtype.toLowerCase()) {
        s |= 2;
    } else if (spec.subtype != '*') {
        return null;
    }
    var keys = Object.keys(spec.params);
    if (keys.length > 0) {
        if (keys.every(function(k) {
            return spec.params[k] == '*' || (spec.params[k] || '').toLowerCase() == (p.params[k] || '').toLowerCase();
        })) {
            s |= 1;
        } else {
            return null;
        }
    }
    return {
        i: index,
        o: spec.i,
        q: spec.q,
        s: s
    };
}
/**
 * Get the preferred media types from an Accept header.
 * @public
 */ function preferredMediaTypes(accept, provided) {
    // RFC 2616 sec 14.2: no header = */*
    var accepts = parseAccept(accept === undefined ? '*/*' : accept || '');
    if (!provided) {
        // sorted list of all types
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullType);
    }
    var priorities = provided.map(function getPriority(type, index) {
        return getMediaTypePriority(type, accepts, index);
    });
    // sorted list of accepted types
    return priorities.filter(isQuality).sort(compareSpecs).map(function getType(priority) {
        return provided[priorities.indexOf(priority)];
    });
}
/**
 * Compare two specs.
 * @private
 */ function compareSpecs(a, b) {
    return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
}
/**
 * Get full type string.
 * @private
 */ function getFullType(spec) {
    return spec.type + '/' + spec.subtype;
}
/**
 * Check if a spec has any quality.
 * @private
 */ function isQuality(spec) {
    return spec.q > 0;
}
/**
 * Count the number of quotes in a string.
 * @private
 */ function quoteCount(string) {
    var count = 0;
    var index = 0;
    while((index = string.indexOf('"', index)) !== -1){
        count++;
        index++;
    }
    return count;
}
/**
 * Split a key value pair.
 * @private
 */ function splitKeyValuePair(str) {
    var index = str.indexOf('=');
    var key;
    var val;
    if (index === -1) {
        key = str;
    } else {
        key = str.slice(0, index);
        val = str.slice(index + 1);
    }
    return [
        key,
        val
    ];
}
/**
 * Split an Accept header into media types.
 * @private
 */ function splitMediaTypes(accept) {
    var accepts = accept.split(',');
    for(var i = 1, j = 0; i < accepts.length; i++){
        if (quoteCount(accepts[j]) % 2 == 0) {
            accepts[++j] = accepts[i];
        } else {
            accepts[j] += ',' + accepts[i];
        }
    }
    // trim accepts
    accepts.length = j + 1;
    return accepts;
}
/**
 * Split a string of parameters.
 * @private
 */ function splitParameters(str) {
    var parameters = str.split(';');
    for(var i = 1, j = 0; i < parameters.length; i++){
        if (quoteCount(parameters[j]) % 2 == 0) {
            parameters[++j] = parameters[i];
        } else {
            parameters[j] += ';' + parameters[i];
        }
    }
    // trim parameters
    parameters.length = j + 1;
    for(var i = 0; i < parameters.length; i++){
        parameters[i] = parameters[i].trim();
    }
    return parameters;
}
}),
"[project]/node_modules/negotiator/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*!
 * negotiator
 * Copyright(c) 2012 Federico Romero
 * Copyright(c) 2012-2014 Isaac Z. Schlueter
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */ var preferredCharsets = __turbopack_context__.r("[project]/node_modules/negotiator/lib/charset.js [app-route] (ecmascript)");
var preferredEncodings = __turbopack_context__.r("[project]/node_modules/negotiator/lib/encoding.js [app-route] (ecmascript)");
var preferredLanguages = __turbopack_context__.r("[project]/node_modules/negotiator/lib/language.js [app-route] (ecmascript)");
var preferredMediaTypes = __turbopack_context__.r("[project]/node_modules/negotiator/lib/mediaType.js [app-route] (ecmascript)");
/**
 * Module exports.
 * @public
 */ module.exports = Negotiator;
module.exports.Negotiator = Negotiator;
/**
 * Create a Negotiator instance from a request.
 * @param {object} request
 * @public
 */ function Negotiator(request) {
    if (!(this instanceof Negotiator)) {
        return new Negotiator(request);
    }
    this.request = request;
}
Negotiator.prototype.charset = function charset(available) {
    var set = this.charsets(available);
    return set && set[0];
};
Negotiator.prototype.charsets = function charsets(available) {
    return preferredCharsets(this.request.headers['accept-charset'], available);
};
Negotiator.prototype.encoding = function encoding(available, opts) {
    var set = this.encodings(available, opts);
    return set && set[0];
};
Negotiator.prototype.encodings = function encodings(available, options) {
    var opts = options || {};
    return preferredEncodings(this.request.headers['accept-encoding'], available, opts.preferred);
};
Negotiator.prototype.language = function language(available) {
    var set = this.languages(available);
    return set && set[0];
};
Negotiator.prototype.languages = function languages(available) {
    return preferredLanguages(this.request.headers['accept-language'], available);
};
Negotiator.prototype.mediaType = function mediaType(available) {
    var set = this.mediaTypes(available);
    return set && set[0];
};
Negotiator.prototype.mediaTypes = function mediaTypes(available) {
    return preferredMediaTypes(this.request.headers.accept, available);
};
// Backwards compatibility
Negotiator.prototype.preferredCharset = Negotiator.prototype.charset;
Negotiator.prototype.preferredCharsets = Negotiator.prototype.charsets;
Negotiator.prototype.preferredEncoding = Negotiator.prototype.encoding;
Negotiator.prototype.preferredEncodings = Negotiator.prototype.encodings;
Negotiator.prototype.preferredLanguage = Negotiator.prototype.language;
Negotiator.prototype.preferredLanguages = Negotiator.prototype.languages;
Negotiator.prototype.preferredMediaType = Negotiator.prototype.mediaType;
Negotiator.prototype.preferredMediaTypes = Negotiator.prototype.mediaTypes;
}),
"[project]/node_modules/inherits/inherits_browser.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

if (typeof Object.create === 'function') {
    // implementation from standard node.js 'util' module
    module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
                constructor: {
                    value: ctor,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
        }
    };
} else {
    // old school shim for old browsers
    module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {};
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
        }
    };
}
}),
"[project]/node_modules/inherits/inherits.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

try {
    var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
    /* istanbul ignore next */ if (typeof util.inherits !== 'function') throw '';
    module.exports = util.inherits;
} catch (e) {
    /* istanbul ignore next */ module.exports = __turbopack_context__.r("[project]/node_modules/inherits/inherits_browser.js [app-route] (ecmascript)");
}
}),
"[project]/node_modules/safe-buffer/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */ /* eslint-disable node/no-deprecated-api */ var buffer = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)");
var Buffer = buffer.Buffer;
// alternative to using Object.keys for old browsers
function copyProps(src, dst) {
    for(var key in src){
        dst[key] = src[key];
    }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
    module.exports = buffer;
} else {
    // Copy properties from require('buffer')
    copyProps(buffer, exports);
    exports.Buffer = SafeBuffer;
}
function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer(arg, encodingOrOffset, length);
}
SafeBuffer.prototype = Object.create(Buffer.prototype);
// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer);
SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === 'number') {
        throw new TypeError('Argument must not be a number');
    }
    return Buffer(arg, encodingOrOffset, length);
};
SafeBuffer.alloc = function(size, fill, encoding) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    var buf = Buffer(size);
    if (fill !== undefined) {
        if (typeof encoding === 'string') {
            buf.fill(fill, encoding);
        } else {
            buf.fill(fill);
        }
    } else {
        buf.fill(0);
    }
    return buf;
};
SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    return Buffer(size);
};
SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    return buffer.SlowBuffer(size);
};
}),
"[project]/node_modules/isarray/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var toString = {}.toString;
module.exports = Array.isArray || function(arr) {
    return toString.call(arr) == '[object Array]';
};
}),
"[project]/node_modules/es-errors/type.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./type')} */ module.exports = TypeError;
}),
"[project]/node_modules/es-errors/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('.')} */ module.exports = Error;
}),
"[project]/node_modules/es-errors/eval.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./eval')} */ module.exports = EvalError;
}),
"[project]/node_modules/es-errors/range.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./range')} */ module.exports = RangeError;
}),
"[project]/node_modules/es-errors/ref.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./ref')} */ module.exports = ReferenceError;
}),
"[project]/node_modules/es-errors/syntax.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./syntax')} */ module.exports = SyntaxError;
}),
"[project]/node_modules/es-errors/uri.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./uri')} */ module.exports = URIError;
}),
"[project]/node_modules/es-object-atoms/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('.')} */ module.exports = Object;
}),
"[project]/node_modules/math-intrinsics/abs.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./abs')} */ module.exports = Math.abs;
}),
"[project]/node_modules/math-intrinsics/floor.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./floor')} */ module.exports = Math.floor;
}),
"[project]/node_modules/math-intrinsics/max.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./max')} */ module.exports = Math.max;
}),
"[project]/node_modules/math-intrinsics/min.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./min')} */ module.exports = Math.min;
}),
"[project]/node_modules/math-intrinsics/pow.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./pow')} */ module.exports = Math.pow;
}),
"[project]/node_modules/math-intrinsics/round.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./round')} */ module.exports = Math.round;
}),
"[project]/node_modules/math-intrinsics/isNaN.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./isNaN')} */ module.exports = Number.isNaN || function isNaN(a) {
    return a !== a;
};
}),
"[project]/node_modules/math-intrinsics/sign.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var $isNaN = __turbopack_context__.r("[project]/node_modules/math-intrinsics/isNaN.js [app-route] (ecmascript)");
/** @type {import('./sign')} */ module.exports = function sign(number) {
    if ($isNaN(number) || number === 0) {
        return number;
    }
    return number < 0 ? -1 : +1;
};
}),
"[project]/node_modules/gopd/gOPD.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./gOPD')} */ module.exports = Object.getOwnPropertyDescriptor;
}),
"[project]/node_modules/gopd/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('.')} */ var $gOPD = __turbopack_context__.r("[project]/node_modules/gopd/gOPD.js [app-route] (ecmascript)");
if ($gOPD) {
    try {
        $gOPD([], 'length');
    } catch (e) {
        // IE 8 has a broken gOPD
        $gOPD = null;
    }
}
module.exports = $gOPD;
}),
"[project]/node_modules/es-define-property/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('.')} */ var $defineProperty = Object.defineProperty || false;
if ($defineProperty) {
    try {
        $defineProperty({}, 'a', {
            value: 1
        });
    } catch (e) {
        // IE 8 has a broken defineProperty
        $defineProperty = false;
    }
}
module.exports = $defineProperty;
}),
"[project]/node_modules/has-symbols/shams.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./shams')} */ /* eslint complexity: [2, 18], max-statements: [2, 33] */ module.exports = function hasSymbols() {
    if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') {
        return false;
    }
    if (typeof Symbol.iterator === 'symbol') {
        return true;
    }
    /** @type {{ [k in symbol]?: unknown }} */ var obj = {};
    var sym = Symbol('test');
    var symObj = Object(sym);
    if (typeof sym === 'string') {
        return false;
    }
    if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
        return false;
    }
    if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
        return false;
    }
    // temp disabled per https://github.com/ljharb/object.assign/issues/17
    // if (sym instanceof Symbol) { return false; }
    // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
    // if (!(symObj instanceof Symbol)) { return false; }
    // if (typeof Symbol.prototype.toString !== 'function') { return false; }
    // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }
    var symVal = 42;
    obj[sym] = symVal;
    for(var _ in obj){
        return false;
    } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
    if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
        return false;
    }
    if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
    }
    var syms = Object.getOwnPropertySymbols(obj);
    if (syms.length !== 1 || syms[0] !== sym) {
        return false;
    }
    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
    }
    if (typeof Object.getOwnPropertyDescriptor === 'function') {
        // eslint-disable-next-line no-extra-parens
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
            return false;
        }
    }
    return true;
};
}),
"[project]/node_modules/has-symbols/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __turbopack_context__.r("[project]/node_modules/has-symbols/shams.js [app-route] (ecmascript)");
/** @type {import('.')} */ module.exports = function hasNativeSymbols() {
    if (typeof origSymbol !== 'function') {
        return false;
    }
    if (typeof Symbol !== 'function') {
        return false;
    }
    if (typeof origSymbol('foo') !== 'symbol') {
        return false;
    }
    if (typeof Symbol('bar') !== 'symbol') {
        return false;
    }
    return hasSymbolSham();
};
}),
"[project]/node_modules/get-proto/Reflect.getPrototypeOf.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./Reflect.getPrototypeOf')} */ module.exports = typeof Reflect !== 'undefined' && Reflect.getPrototypeOf || null;
}),
"[project]/node_modules/get-proto/Object.getPrototypeOf.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var $Object = __turbopack_context__.r("[project]/node_modules/es-object-atoms/index.js [app-route] (ecmascript)");
/** @type {import('./Object.getPrototypeOf')} */ module.exports = $Object.getPrototypeOf || null;
}),
"[project]/node_modules/get-proto/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var reflectGetProto = __turbopack_context__.r("[project]/node_modules/get-proto/Reflect.getPrototypeOf.js [app-route] (ecmascript)");
var originalGetProto = __turbopack_context__.r("[project]/node_modules/get-proto/Object.getPrototypeOf.js [app-route] (ecmascript)");
var getDunderProto = __turbopack_context__.r("[project]/node_modules/dunder-proto/get.js [app-route] (ecmascript)");
/** @type {import('.')} */ module.exports = reflectGetProto ? function getProto(O) {
    // @ts-expect-error TS can't narrow inside a closure, for some reason
    return reflectGetProto(O);
} : originalGetProto ? function getProto(O) {
    if (!O || typeof O !== 'object' && typeof O !== 'function') {
        throw new TypeError('getProto: not an object');
    }
    // @ts-expect-error TS can't narrow inside a closure, for some reason
    return originalGetProto(O);
} : getDunderProto ? function getProto(O) {
    // @ts-expect-error TS can't narrow inside a closure, for some reason
    return getDunderProto(O);
} : null;
}),
"[project]/node_modules/function-bind/implementation.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint no-invalid-this: 1 */ var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var toStr = Object.prototype.toString;
var max = Math.max;
var funcType = '[object Function]';
var concatty = function concatty(a, b) {
    var arr = [];
    for(var i = 0; i < a.length; i += 1){
        arr[i] = a[i];
    }
    for(var j = 0; j < b.length; j += 1){
        arr[j + a.length] = b[j];
    }
    return arr;
};
var slicy = function slicy(arrLike, offset) {
    var arr = [];
    for(var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1){
        arr[j] = arrLike[i];
    }
    return arr;
};
var joiny = function(arr, joiner) {
    var str = '';
    for(var i = 0; i < arr.length; i += 1){
        str += arr[i];
        if (i + 1 < arr.length) {
            str += joiner;
        }
    }
    return str;
};
module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);
    var bound;
    var binder = function() {
        if (this instanceof bound) {
            var result = target.apply(this, concatty(args, arguments));
            if (Object(result) === result) {
                return result;
            }
            return this;
        }
        return target.apply(that, concatty(args, arguments));
    };
    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for(var i = 0; i < boundLength; i++){
        boundArgs[i] = '$' + i;
    }
    bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);
    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }
    return bound;
};
}),
"[project]/node_modules/function-bind/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var implementation = __turbopack_context__.r("[project]/node_modules/function-bind/implementation.js [app-route] (ecmascript)");
module.exports = Function.prototype.bind || implementation;
}),
"[project]/node_modules/call-bind-apply-helpers/functionCall.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./functionCall')} */ module.exports = Function.prototype.call;
}),
"[project]/node_modules/call-bind-apply-helpers/functionApply.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./functionApply')} */ module.exports = Function.prototype.apply;
}),
"[project]/node_modules/call-bind-apply-helpers/reflectApply.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./reflectApply')} */ module.exports = typeof Reflect !== 'undefined' && Reflect && Reflect.apply;
}),
"[project]/node_modules/call-bind-apply-helpers/actualApply.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var bind = __turbopack_context__.r("[project]/node_modules/function-bind/index.js [app-route] (ecmascript)");
var $apply = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/functionApply.js [app-route] (ecmascript)");
var $call = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/functionCall.js [app-route] (ecmascript)");
var $reflectApply = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/reflectApply.js [app-route] (ecmascript)");
/** @type {import('./actualApply')} */ module.exports = $reflectApply || bind.call($call, $apply);
}),
"[project]/node_modules/call-bind-apply-helpers/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var bind = __turbopack_context__.r("[project]/node_modules/function-bind/index.js [app-route] (ecmascript)");
var $TypeError = __turbopack_context__.r("[project]/node_modules/es-errors/type.js [app-route] (ecmascript)");
var $call = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/functionCall.js [app-route] (ecmascript)");
var $actualApply = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/actualApply.js [app-route] (ecmascript)");
/** @type {(args: [Function, thisArg?: unknown, ...args: unknown[]]) => Function} TODO FIXME, find a way to use import('.') */ module.exports = function callBindBasic(args) {
    if (args.length < 1 || typeof args[0] !== 'function') {
        throw new $TypeError('a function is required');
    }
    return $actualApply(bind, $call, args);
};
}),
"[project]/node_modules/call-bind-apply-helpers/applyBind.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var bind = __turbopack_context__.r("[project]/node_modules/function-bind/index.js [app-route] (ecmascript)");
var $apply = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/functionApply.js [app-route] (ecmascript)");
var actualApply = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/actualApply.js [app-route] (ecmascript)");
/** @type {import('./applyBind')} */ module.exports = function applyBind() {
    return actualApply(bind, $apply, arguments);
};
}),
"[project]/node_modules/dunder-proto/get.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var callBind = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/index.js [app-route] (ecmascript)");
var gOPD = __turbopack_context__.r("[project]/node_modules/gopd/index.js [app-route] (ecmascript)");
var hasProtoAccessor;
try {
    // eslint-disable-next-line no-extra-parens, no-proto
    hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */ [].__proto__ === Array.prototype;
} catch (e) {
    if (!e || typeof e !== 'object' || !('code' in e) || e.code !== 'ERR_PROTO_ACCESS') {
        throw e;
    }
}
// eslint-disable-next-line no-extra-parens
var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, '__proto__');
var $Object = Object;
var $getPrototypeOf = $Object.getPrototypeOf;
/** @type {import('./get')} */ module.exports = desc && typeof desc.get === 'function' ? callBind([
    desc.get
]) : typeof $getPrototypeOf === 'function' ? /** @type {import('./get')} */ function getDunder(value) {
    // eslint-disable-next-line eqeqeq
    return $getPrototypeOf(value == null ? value : $Object(value));
} : false;
}),
"[project]/node_modules/hasown/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = __turbopack_context__.r("[project]/node_modules/function-bind/index.js [app-route] (ecmascript)");
/** @type {import('.')} */ module.exports = bind.call(call, $hasOwn);
}),
"[project]/node_modules/get-intrinsic/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var undefined1;
var $Object = __turbopack_context__.r("[project]/node_modules/es-object-atoms/index.js [app-route] (ecmascript)");
var $Error = __turbopack_context__.r("[project]/node_modules/es-errors/index.js [app-route] (ecmascript)");
var $EvalError = __turbopack_context__.r("[project]/node_modules/es-errors/eval.js [app-route] (ecmascript)");
var $RangeError = __turbopack_context__.r("[project]/node_modules/es-errors/range.js [app-route] (ecmascript)");
var $ReferenceError = __turbopack_context__.r("[project]/node_modules/es-errors/ref.js [app-route] (ecmascript)");
var $SyntaxError = __turbopack_context__.r("[project]/node_modules/es-errors/syntax.js [app-route] (ecmascript)");
var $TypeError = __turbopack_context__.r("[project]/node_modules/es-errors/type.js [app-route] (ecmascript)");
var $URIError = __turbopack_context__.r("[project]/node_modules/es-errors/uri.js [app-route] (ecmascript)");
var abs = __turbopack_context__.r("[project]/node_modules/math-intrinsics/abs.js [app-route] (ecmascript)");
var floor = __turbopack_context__.r("[project]/node_modules/math-intrinsics/floor.js [app-route] (ecmascript)");
var max = __turbopack_context__.r("[project]/node_modules/math-intrinsics/max.js [app-route] (ecmascript)");
var min = __turbopack_context__.r("[project]/node_modules/math-intrinsics/min.js [app-route] (ecmascript)");
var pow = __turbopack_context__.r("[project]/node_modules/math-intrinsics/pow.js [app-route] (ecmascript)");
var round = __turbopack_context__.r("[project]/node_modules/math-intrinsics/round.js [app-route] (ecmascript)");
var sign = __turbopack_context__.r("[project]/node_modules/math-intrinsics/sign.js [app-route] (ecmascript)");
var $Function = Function;
// eslint-disable-next-line consistent-return
var getEvalledConstructor = function(expressionSyntax) {
    try {
        return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
    } catch (e) {}
};
var $gOPD = __turbopack_context__.r("[project]/node_modules/gopd/index.js [app-route] (ecmascript)");
var $defineProperty = __turbopack_context__.r("[project]/node_modules/es-define-property/index.js [app-route] (ecmascript)");
var throwTypeError = function() {
    throw new $TypeError();
};
var ThrowTypeError = $gOPD ? function() {
    try {
        // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
        arguments.callee; // IE 8 does not throw here
        return throwTypeError;
    } catch (calleeThrows) {
        try {
            // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
            return $gOPD(arguments, 'callee').get;
        } catch (gOPDthrows) {
            return throwTypeError;
        }
    }
}() : throwTypeError;
var hasSymbols = __turbopack_context__.r("[project]/node_modules/has-symbols/index.js [app-route] (ecmascript)")();
var getProto = __turbopack_context__.r("[project]/node_modules/get-proto/index.js [app-route] (ecmascript)");
var $ObjectGPO = __turbopack_context__.r("[project]/node_modules/get-proto/Object.getPrototypeOf.js [app-route] (ecmascript)");
var $ReflectGPO = __turbopack_context__.r("[project]/node_modules/get-proto/Reflect.getPrototypeOf.js [app-route] (ecmascript)");
var $apply = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/functionApply.js [app-route] (ecmascript)");
var $call = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/functionCall.js [app-route] (ecmascript)");
var needsEval = {};
var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array);
var INTRINSICS = {
    __proto__: null,
    '%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
    '%Array%': Array,
    '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
    '%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
    '%AsyncFromSyncIteratorPrototype%': undefined,
    '%AsyncFunction%': needsEval,
    '%AsyncGenerator%': needsEval,
    '%AsyncGeneratorFunction%': needsEval,
    '%AsyncIteratorPrototype%': needsEval,
    '%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
    '%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
    '%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
    '%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
    '%Boolean%': Boolean,
    '%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
    '%Date%': Date,
    '%decodeURI%': decodeURI,
    '%decodeURIComponent%': decodeURIComponent,
    '%encodeURI%': encodeURI,
    '%encodeURIComponent%': encodeURIComponent,
    '%Error%': $Error,
    '%eval%': eval,
    '%EvalError%': $EvalError,
    '%Float16Array%': typeof Float16Array === 'undefined' ? undefined : Float16Array,
    '%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
    '%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
    '%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
    '%Function%': $Function,
    '%GeneratorFunction%': needsEval,
    '%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
    '%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
    '%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
    '%isFinite%': isFinite,
    '%isNaN%': isNaN,
    '%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
    '%JSON%': typeof JSON === 'object' ? JSON : undefined,
    '%Map%': typeof Map === 'undefined' ? undefined : Map,
    '%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
    '%Math%': Math,
    '%Number%': Number,
    '%Object%': $Object,
    '%Object.getOwnPropertyDescriptor%': $gOPD,
    '%parseFloat%': parseFloat,
    '%parseInt%': parseInt,
    '%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
    '%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
    '%RangeError%': $RangeError,
    '%ReferenceError%': $ReferenceError,
    '%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
    '%RegExp%': RegExp,
    '%Set%': typeof Set === 'undefined' ? undefined : Set,
    '%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
    '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
    '%String%': String,
    '%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
    '%Symbol%': hasSymbols ? Symbol : undefined,
    '%SyntaxError%': $SyntaxError,
    '%ThrowTypeError%': ThrowTypeError,
    '%TypedArray%': TypedArray,
    '%TypeError%': $TypeError,
    '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
    '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
    '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
    '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
    '%URIError%': $URIError,
    '%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
    '%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
    '%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
    '%Function.prototype.call%': $call,
    '%Function.prototype.apply%': $apply,
    '%Object.defineProperty%': $defineProperty,
    '%Object.getPrototypeOf%': $ObjectGPO,
    '%Math.abs%': abs,
    '%Math.floor%': floor,
    '%Math.max%': max,
    '%Math.min%': min,
    '%Math.pow%': pow,
    '%Math.round%': round,
    '%Math.sign%': sign,
    '%Reflect.getPrototypeOf%': $ReflectGPO
};
if (getProto) {
    try {
        null.error; // eslint-disable-line no-unused-expressions
    } catch (e) {
        // https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
        var errorProto = getProto(getProto(e));
        INTRINSICS['%Error.prototype%'] = errorProto;
    }
}
var doEval = function doEval(name) {
    var value;
    if (name === '%AsyncFunction%') {
        value = getEvalledConstructor('async function () {}');
    } else if (name === '%GeneratorFunction%') {
        value = getEvalledConstructor('function* () {}');
    } else if (name === '%AsyncGeneratorFunction%') {
        value = getEvalledConstructor('async function* () {}');
    } else if (name === '%AsyncGenerator%') {
        var fn = doEval('%AsyncGeneratorFunction%');
        if (fn) {
            value = fn.prototype;
        }
    } else if (name === '%AsyncIteratorPrototype%') {
        var gen = doEval('%AsyncGenerator%');
        if (gen && getProto) {
            value = getProto(gen.prototype);
        }
    }
    INTRINSICS[name] = value;
    return value;
};
var LEGACY_ALIASES = {
    __proto__: null,
    '%ArrayBufferPrototype%': [
        'ArrayBuffer',
        'prototype'
    ],
    '%ArrayPrototype%': [
        'Array',
        'prototype'
    ],
    '%ArrayProto_entries%': [
        'Array',
        'prototype',
        'entries'
    ],
    '%ArrayProto_forEach%': [
        'Array',
        'prototype',
        'forEach'
    ],
    '%ArrayProto_keys%': [
        'Array',
        'prototype',
        'keys'
    ],
    '%ArrayProto_values%': [
        'Array',
        'prototype',
        'values'
    ],
    '%AsyncFunctionPrototype%': [
        'AsyncFunction',
        'prototype'
    ],
    '%AsyncGenerator%': [
        'AsyncGeneratorFunction',
        'prototype'
    ],
    '%AsyncGeneratorPrototype%': [
        'AsyncGeneratorFunction',
        'prototype',
        'prototype'
    ],
    '%BooleanPrototype%': [
        'Boolean',
        'prototype'
    ],
    '%DataViewPrototype%': [
        'DataView',
        'prototype'
    ],
    '%DatePrototype%': [
        'Date',
        'prototype'
    ],
    '%ErrorPrototype%': [
        'Error',
        'prototype'
    ],
    '%EvalErrorPrototype%': [
        'EvalError',
        'prototype'
    ],
    '%Float32ArrayPrototype%': [
        'Float32Array',
        'prototype'
    ],
    '%Float64ArrayPrototype%': [
        'Float64Array',
        'prototype'
    ],
    '%FunctionPrototype%': [
        'Function',
        'prototype'
    ],
    '%Generator%': [
        'GeneratorFunction',
        'prototype'
    ],
    '%GeneratorPrototype%': [
        'GeneratorFunction',
        'prototype',
        'prototype'
    ],
    '%Int8ArrayPrototype%': [
        'Int8Array',
        'prototype'
    ],
    '%Int16ArrayPrototype%': [
        'Int16Array',
        'prototype'
    ],
    '%Int32ArrayPrototype%': [
        'Int32Array',
        'prototype'
    ],
    '%JSONParse%': [
        'JSON',
        'parse'
    ],
    '%JSONStringify%': [
        'JSON',
        'stringify'
    ],
    '%MapPrototype%': [
        'Map',
        'prototype'
    ],
    '%NumberPrototype%': [
        'Number',
        'prototype'
    ],
    '%ObjectPrototype%': [
        'Object',
        'prototype'
    ],
    '%ObjProto_toString%': [
        'Object',
        'prototype',
        'toString'
    ],
    '%ObjProto_valueOf%': [
        'Object',
        'prototype',
        'valueOf'
    ],
    '%PromisePrototype%': [
        'Promise',
        'prototype'
    ],
    '%PromiseProto_then%': [
        'Promise',
        'prototype',
        'then'
    ],
    '%Promise_all%': [
        'Promise',
        'all'
    ],
    '%Promise_reject%': [
        'Promise',
        'reject'
    ],
    '%Promise_resolve%': [
        'Promise',
        'resolve'
    ],
    '%RangeErrorPrototype%': [
        'RangeError',
        'prototype'
    ],
    '%ReferenceErrorPrototype%': [
        'ReferenceError',
        'prototype'
    ],
    '%RegExpPrototype%': [
        'RegExp',
        'prototype'
    ],
    '%SetPrototype%': [
        'Set',
        'prototype'
    ],
    '%SharedArrayBufferPrototype%': [
        'SharedArrayBuffer',
        'prototype'
    ],
    '%StringPrototype%': [
        'String',
        'prototype'
    ],
    '%SymbolPrototype%': [
        'Symbol',
        'prototype'
    ],
    '%SyntaxErrorPrototype%': [
        'SyntaxError',
        'prototype'
    ],
    '%TypedArrayPrototype%': [
        'TypedArray',
        'prototype'
    ],
    '%TypeErrorPrototype%': [
        'TypeError',
        'prototype'
    ],
    '%Uint8ArrayPrototype%': [
        'Uint8Array',
        'prototype'
    ],
    '%Uint8ClampedArrayPrototype%': [
        'Uint8ClampedArray',
        'prototype'
    ],
    '%Uint16ArrayPrototype%': [
        'Uint16Array',
        'prototype'
    ],
    '%Uint32ArrayPrototype%': [
        'Uint32Array',
        'prototype'
    ],
    '%URIErrorPrototype%': [
        'URIError',
        'prototype'
    ],
    '%WeakMapPrototype%': [
        'WeakMap',
        'prototype'
    ],
    '%WeakSetPrototype%': [
        'WeakSet',
        'prototype'
    ]
};
var bind = __turbopack_context__.r("[project]/node_modules/function-bind/index.js [app-route] (ecmascript)");
var hasOwn = __turbopack_context__.r("[project]/node_modules/hasown/index.js [app-route] (ecmascript)");
var $concat = bind.call($call, Array.prototype.concat);
var $spliceApply = bind.call($apply, Array.prototype.splice);
var $replace = bind.call($call, String.prototype.replace);
var $strSlice = bind.call($call, String.prototype.slice);
var $exec = bind.call($call, RegExp.prototype.exec);
/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */ var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */ 
var stringToPath = function stringToPath(string) {
    var first = $strSlice(string, 0, 1);
    var last = $strSlice(string, -1);
    if (first === '%' && last !== '%') {
        throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
    } else if (last === '%' && first !== '%') {
        throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
    }
    var result = [];
    $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
    });
    return result;
};
/* end adaptation */ var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
    var intrinsicName = name;
    var alias;
    if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = '%' + alias[0] + '%';
    }
    if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
            value = doEval(intrinsicName);
        }
        if (typeof value === 'undefined' && !allowMissing) {
            throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
        }
        return {
            alias: alias,
            name: intrinsicName,
            value: value
        };
    }
    throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};
module.exports = function GetIntrinsic(name, allowMissing) {
    if (typeof name !== 'string' || name.length === 0) {
        throw new $TypeError('intrinsic name must be a non-empty string');
    }
    if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
        throw new $TypeError('"allowMissing" argument must be a boolean');
    }
    if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
    }
    var parts = stringToPath(name);
    var intrinsicBaseName = parts.length > 0 ? parts[0] : '';
    var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
    var intrinsicRealName = intrinsic.name;
    var value = intrinsic.value;
    var skipFurtherCaching = false;
    var alias = intrinsic.alias;
    if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([
            0,
            1
        ], alias));
    }
    for(var i = 1, isOwn = true; i < parts.length; i += 1){
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === '`' || last === '"' || last === "'" || last === '`') && first !== last) {
            throw new $SyntaxError('property names with quotes must have matching quotes');
        }
        if (part === 'constructor' || !isOwn) {
            skipFurtherCaching = true;
        }
        intrinsicBaseName += '.' + part;
        intrinsicRealName = '%' + intrinsicBaseName + '%';
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
            value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
            if (!(part in value)) {
                if (!allowMissing) {
                    throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
                }
                return void undefined;
            }
            if ($gOPD && i + 1 >= parts.length) {
                var desc = $gOPD(value, part);
                isOwn = !!desc;
                // By convention, when a data property is converted to an accessor
                // property to emulate a data property that does not suffer from
                // the override mistake, that accessor's getter is marked with
                // an `originalValue` property. Here, when we detect this, we
                // uphold the illusion by pretending to see that original data
                // property, i.e., returning the value rather than the getter
                // itself.
                if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
                    value = desc.get;
                } else {
                    value = value[part];
                }
            } else {
                isOwn = hasOwn(value, part);
                value = value[part];
            }
            if (isOwn && !skipFurtherCaching) {
                INTRINSICS[intrinsicRealName] = value;
            }
        }
    }
    return value;
};
}),
"[project]/node_modules/call-bound/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var GetIntrinsic = __turbopack_context__.r("[project]/node_modules/get-intrinsic/index.js [app-route] (ecmascript)");
var callBindBasic = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/index.js [app-route] (ecmascript)");
/** @type {(thisArg: string, searchString: string, position?: number) => number} */ var $indexOf = callBindBasic([
    GetIntrinsic('%String.prototype.indexOf%')
]);
/** @type {import('.')} */ module.exports = function callBoundIntrinsic(name, allowMissing) {
    /* eslint no-extra-parens: 0 */ var intrinsic = GetIntrinsic(name, !!allowMissing);
    if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
        return callBindBasic([
            intrinsic
        ]);
    }
    return intrinsic;
};
}),
"[project]/node_modules/is-callable/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
    try {
        badArrayLike = Object.defineProperty({}, 'length', {
            get: function() {
                throw isCallableMarker;
            }
        });
        isCallableMarker = {};
        // eslint-disable-next-line no-throw-literal
        reflectApply(function() {
            throw 42;
        }, null, badArrayLike);
    } catch (_) {
        if (_ !== isCallableMarker) {
            reflectApply = null;
        }
    }
} else {
    reflectApply = null;
}
var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
    try {
        var fnStr = fnToStr.call(value);
        return constructorRegex.test(fnStr);
    } catch (e) {
        return false; // not a function
    }
};
var tryFunctionObject = function tryFunctionToStr(value) {
    try {
        if (isES6ClassFn(value)) {
            return false;
        }
        fnToStr.call(value);
        return true;
    } catch (e) {
        return false;
    }
};
var toStr = Object.prototype.toString;
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`
var isIE68 = !(0 in [
    , 
]); // eslint-disable-line no-sparse-arrays, comma-spacing
var isDDA = function isDocumentDotAll() {
    return false;
};
if (typeof document === 'object') {
    // Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
    var all = document.all;
    if (toStr.call(all) === toStr.call(document.all)) {
        isDDA = function isDocumentDotAll(value) {
            /* globals document: false */ // in IE 6-8, typeof document.all is "object" and it's truthy
            if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
                try {
                    var str = toStr.call(value);
                    return (str === ddaClass || str === ddaClass2 || str === ddaClass3 // opera 12.16
                     || str === objectClass // IE 6-8
                    ) && value('') == null; // eslint-disable-line eqeqeq
                } catch (e) {}
            }
            return false;
        };
    }
}
module.exports = reflectApply ? function isCallable(value) {
    if (isDDA(value)) {
        return true;
    }
    if (!value) {
        return false;
    }
    if (typeof value !== 'function' && typeof value !== 'object') {
        return false;
    }
    try {
        reflectApply(value, null, badArrayLike);
    } catch (e) {
        if (e !== isCallableMarker) {
            return false;
        }
    }
    return !isES6ClassFn(value) && tryFunctionObject(value);
} : function isCallable(value) {
    if (isDDA(value)) {
        return true;
    }
    if (!value) {
        return false;
    }
    if (typeof value !== 'function' && typeof value !== 'object') {
        return false;
    }
    if (hasToStringTag) {
        return tryFunctionObject(value);
    }
    if (isES6ClassFn(value)) {
        return false;
    }
    var strClass = toStr.call(value);
    if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
        return false;
    }
    return tryFunctionObject(value);
};
}),
"[project]/node_modules/for-each/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var isCallable = __turbopack_context__.r("[project]/node_modules/is-callable/index.js [app-route] (ecmascript)");
var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
/** @type {<This, A extends readonly unknown[]>(arr: A, iterator: (this: This | void, value: A[number], index: number, arr: A) => void, receiver: This | undefined) => void} */ var forEachArray = function forEachArray(array, iterator, receiver) {
    for(var i = 0, len = array.length; i < len; i++){
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};
/** @type {<This, S extends string>(string: S, iterator: (this: This | void, value: S[number], index: number, string: S) => void, receiver: This | undefined) => void} */ var forEachString = function forEachString(string, iterator, receiver) {
    for(var i = 0, len = string.length; i < len; i++){
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};
/** @type {<This, O>(obj: O, iterator: (this: This | void, value: O[keyof O], index: keyof O, obj: O) => void, receiver: This | undefined) => void} */ var forEachObject = function forEachObject(object, iterator, receiver) {
    for(var k in object){
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};
/** @type {(x: unknown) => x is readonly unknown[]} */ function isArray(x) {
    return toStr.call(x) === '[object Array]';
}
/** @type {import('.')._internal} */ module.exports = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }
    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }
    if (isArray(list)) {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};
}),
"[project]/node_modules/possible-typed-array-names/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('.')} */ module.exports = [
    'Float16Array',
    'Float32Array',
    'Float64Array',
    'Int8Array',
    'Int16Array',
    'Int32Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Uint16Array',
    'Uint32Array',
    'BigInt64Array',
    'BigUint64Array'
];
}),
"[project]/node_modules/available-typed-arrays/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var possibleNames = __turbopack_context__.r("[project]/node_modules/possible-typed-array-names/index.js [app-route] (ecmascript)");
var g = typeof globalThis === 'undefined' ? /*TURBOPACK member replacement*/ __turbopack_context__.g : globalThis;
/** @type {import('.')} */ module.exports = function availableTypedArrays() {
    var /** @type {ReturnType<typeof availableTypedArrays>} */ out = [];
    for(var i = 0; i < possibleNames.length; i++){
        if (typeof g[possibleNames[i]] === 'function') {
            // @ts-expect-error
            out[out.length] = possibleNames[i];
        }
    }
    return out;
};
}),
"[project]/node_modules/define-data-property/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var $defineProperty = __turbopack_context__.r("[project]/node_modules/es-define-property/index.js [app-route] (ecmascript)");
var $SyntaxError = __turbopack_context__.r("[project]/node_modules/es-errors/syntax.js [app-route] (ecmascript)");
var $TypeError = __turbopack_context__.r("[project]/node_modules/es-errors/type.js [app-route] (ecmascript)");
var gopd = __turbopack_context__.r("[project]/node_modules/gopd/index.js [app-route] (ecmascript)");
/** @type {import('.')} */ module.exports = function defineDataProperty(obj, property, value) {
    if (!obj || typeof obj !== 'object' && typeof obj !== 'function') {
        throw new $TypeError('`obj` must be an object or a function`');
    }
    if (typeof property !== 'string' && typeof property !== 'symbol') {
        throw new $TypeError('`property` must be a string or a symbol`');
    }
    if (arguments.length > 3 && typeof arguments[3] !== 'boolean' && arguments[3] !== null) {
        throw new $TypeError('`nonEnumerable`, if provided, must be a boolean or null');
    }
    if (arguments.length > 4 && typeof arguments[4] !== 'boolean' && arguments[4] !== null) {
        throw new $TypeError('`nonWritable`, if provided, must be a boolean or null');
    }
    if (arguments.length > 5 && typeof arguments[5] !== 'boolean' && arguments[5] !== null) {
        throw new $TypeError('`nonConfigurable`, if provided, must be a boolean or null');
    }
    if (arguments.length > 6 && typeof arguments[6] !== 'boolean') {
        throw new $TypeError('`loose`, if provided, must be a boolean');
    }
    var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
    var nonWritable = arguments.length > 4 ? arguments[4] : null;
    var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
    var loose = arguments.length > 6 ? arguments[6] : false;
    /* @type {false | TypedPropertyDescriptor<unknown>} */ var desc = !!gopd && gopd(obj, property);
    if ($defineProperty) {
        $defineProperty(obj, property, {
            configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
            enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
            value: value,
            writable: nonWritable === null && desc ? desc.writable : !nonWritable
        });
    } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
        // must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
        obj[property] = value; // eslint-disable-line no-param-reassign
    } else {
        throw new $SyntaxError('This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.');
    }
};
}),
"[project]/node_modules/has-property-descriptors/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var $defineProperty = __turbopack_context__.r("[project]/node_modules/es-define-property/index.js [app-route] (ecmascript)");
var hasPropertyDescriptors = function hasPropertyDescriptors() {
    return !!$defineProperty;
};
hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
    // node v0.6 has a bug where array lengths can be Set but not Defined
    if (!$defineProperty) {
        return null;
    }
    try {
        return $defineProperty([], 'length', {
            value: 1
        }).length !== 1;
    } catch (e) {
        // In Firefox 4-22, defining length on an array throws an exception.
        return true;
    }
};
module.exports = hasPropertyDescriptors;
}),
"[project]/node_modules/set-function-length/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var GetIntrinsic = __turbopack_context__.r("[project]/node_modules/get-intrinsic/index.js [app-route] (ecmascript)");
var define = __turbopack_context__.r("[project]/node_modules/define-data-property/index.js [app-route] (ecmascript)");
var hasDescriptors = __turbopack_context__.r("[project]/node_modules/has-property-descriptors/index.js [app-route] (ecmascript)")();
var gOPD = __turbopack_context__.r("[project]/node_modules/gopd/index.js [app-route] (ecmascript)");
var $TypeError = __turbopack_context__.r("[project]/node_modules/es-errors/type.js [app-route] (ecmascript)");
var $floor = GetIntrinsic('%Math.floor%');
/** @type {import('.')} */ module.exports = function setFunctionLength(fn, length) {
    if (typeof fn !== 'function') {
        throw new $TypeError('`fn` is not a function');
    }
    if (typeof length !== 'number' || length < 0 || length > 0xFFFFFFFF || $floor(length) !== length) {
        throw new $TypeError('`length` must be a positive 32-bit integer');
    }
    var loose = arguments.length > 2 && !!arguments[2];
    var functionLengthIsConfigurable = true;
    var functionLengthIsWritable = true;
    if ('length' in fn && gOPD) {
        var desc = gOPD(fn, 'length');
        if (desc && !desc.configurable) {
            functionLengthIsConfigurable = false;
        }
        if (desc && !desc.writable) {
            functionLengthIsWritable = false;
        }
    }
    if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
        if (hasDescriptors) {
            define(fn, 'length', length, true, true);
        } else {
            define(fn, 'length', length);
        }
    }
    return fn;
};
}),
"[project]/node_modules/call-bind/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var setFunctionLength = __turbopack_context__.r("[project]/node_modules/set-function-length/index.js [app-route] (ecmascript)");
var $defineProperty = __turbopack_context__.r("[project]/node_modules/es-define-property/index.js [app-route] (ecmascript)");
var callBindBasic = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/index.js [app-route] (ecmascript)");
var applyBind = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/applyBind.js [app-route] (ecmascript)");
module.exports = function callBind(originalFunction) {
    var func = callBindBasic(arguments);
    var adjustedLength = originalFunction.length - (arguments.length - 1);
    return setFunctionLength(func, 1 + (adjustedLength > 0 ? adjustedLength : 0), true);
};
if ($defineProperty) {
    $defineProperty(module.exports, 'apply', {
        value: applyBind
    });
} else {
    module.exports.apply = applyBind;
}
}),
"[project]/node_modules/has-tostringtag/shams.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var hasSymbols = __turbopack_context__.r("[project]/node_modules/has-symbols/shams.js [app-route] (ecmascript)");
/** @type {import('.')} */ module.exports = function hasToStringTagShams() {
    return hasSymbols() && !!Symbol.toStringTag;
};
}),
"[project]/node_modules/which-typed-array/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var forEach = __turbopack_context__.r("[project]/node_modules/for-each/index.js [app-route] (ecmascript)");
var availableTypedArrays = __turbopack_context__.r("[project]/node_modules/available-typed-arrays/index.js [app-route] (ecmascript)");
var callBind = __turbopack_context__.r("[project]/node_modules/call-bind/index.js [app-route] (ecmascript)");
var callBound = __turbopack_context__.r("[project]/node_modules/call-bound/index.js [app-route] (ecmascript)");
var gOPD = __turbopack_context__.r("[project]/node_modules/gopd/index.js [app-route] (ecmascript)");
var getProto = __turbopack_context__.r("[project]/node_modules/get-proto/index.js [app-route] (ecmascript)");
var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __turbopack_context__.r("[project]/node_modules/has-tostringtag/shams.js [app-route] (ecmascript)")();
var g = typeof globalThis === 'undefined' ? /*TURBOPACK member replacement*/ __turbopack_context__.g : globalThis;
var typedArrays = availableTypedArrays();
var $slice = callBound('String.prototype.slice');
/** @type {<T = unknown>(array: readonly T[], value: unknown) => number} */ var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
    for(var i = 0; i < array.length; i += 1){
        if (array[i] === value) {
            return i;
        }
    }
    return -1;
};
/** @typedef {import('./types').Getter} Getter */ /** @type {import('./types').Cache} */ var cache = {
    __proto__: null
};
if (hasToStringTag && gOPD && getProto) {
    forEach(typedArrays, function(typedArray) {
        var arr = new g[typedArray]();
        if (Symbol.toStringTag in arr && getProto) {
            var proto = getProto(arr);
            // @ts-expect-error TS won't narrow inside a closure
            var descriptor = gOPD(proto, Symbol.toStringTag);
            if (!descriptor && proto) {
                var superProto = getProto(proto);
                // @ts-expect-error TS won't narrow inside a closure
                descriptor = gOPD(superProto, Symbol.toStringTag);
            }
            // @ts-expect-error TODO: fix
            cache['$' + typedArray] = callBind(descriptor.get);
        }
    });
} else {
    forEach(typedArrays, function(typedArray) {
        var arr = new g[typedArray]();
        var fn = arr.slice || arr.set;
        if (fn) {
            cache['$' + typedArray] = // @ts-expect-error TODO FIXME
            callBind(fn);
        }
    });
}
/** @type {(value: object) => false | import('.').TypedArrayName} */ var tryTypedArrays = function tryAllTypedArrays(value) {
    /** @type {ReturnType<typeof tryAllTypedArrays>} */ var found = false;
    forEach(cache, /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */ function(getter, typedArray) {
        if (!found) {
            try {
                // @ts-expect-error a throw is fine here
                if ('$' + getter(value) === typedArray) {
                    found = $slice(typedArray, 1);
                }
            } catch (e) {}
        }
    });
    return found;
};
/** @type {(value: object) => false | import('.').TypedArrayName} */ var trySlices = function tryAllSlices(value) {
    /** @type {ReturnType<typeof tryAllSlices>} */ var found = false;
    forEach(cache, /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */ function(getter, name) {
        if (!found) {
            try {
                // @ts-expect-error a throw is fine here
                getter(value);
                found = $slice(name, 1);
            } catch (e) {}
        }
    });
    return found;
};
/** @type {import('.')} */ module.exports = function whichTypedArray(value) {
    if (!value || typeof value !== 'object') {
        return false;
    }
    if (!hasToStringTag) {
        /** @type {string} */ var tag = $slice($toString(value), 8, -1);
        if ($indexOf(typedArrays, tag) > -1) {
            return tag;
        }
        if (tag !== 'Object') {
            return false;
        }
        // node < 0.6 hits here on real Typed Arrays
        return trySlices(value);
    }
    if (!gOPD) {
        return null;
    } // unknown engine
    return tryTypedArrays(value);
};
}),
"[project]/node_modules/is-typed-array/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var whichTypedArray = __turbopack_context__.r("[project]/node_modules/which-typed-array/index.js [app-route] (ecmascript)");
/** @type {import('.')} */ module.exports = function isTypedArray(value) {
    return !!whichTypedArray(value);
};
}),
"[project]/node_modules/typed-array-buffer/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var $TypeError = __turbopack_context__.r("[project]/node_modules/es-errors/type.js [app-route] (ecmascript)");
var callBound = __turbopack_context__.r("[project]/node_modules/call-bound/index.js [app-route] (ecmascript)");
/** @type {undefined | ((thisArg: import('.').TypedArray) => Buffer<ArrayBufferLike>)} */ var $typedArrayBuffer = callBound('TypedArray.prototype.buffer', true);
var isTypedArray = __turbopack_context__.r("[project]/node_modules/is-typed-array/index.js [app-route] (ecmascript)");
/** @type {import('.')} */ // node <= 0.10, < 0.11.4 has a nonconfigurable own property instead of a prototype getter
module.exports = $typedArrayBuffer || function typedArrayBuffer(x) {
    if (!isTypedArray(x)) {
        throw new $TypeError('Not a Typed Array');
    }
    return x.buffer;
};
}),
"[project]/node_modules/to-buffer/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Buffer = __turbopack_context__.r("[project]/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
var isArray = __turbopack_context__.r("[project]/node_modules/isarray/index.js [app-route] (ecmascript)");
var typedArrayBuffer = __turbopack_context__.r("[project]/node_modules/typed-array-buffer/index.js [app-route] (ecmascript)");
var isView = ArrayBuffer.isView || function isView(obj) {
    try {
        typedArrayBuffer(obj);
        return true;
    } catch (e) {
        return false;
    }
};
var useUint8Array = typeof Uint8Array !== 'undefined';
var useArrayBuffer = typeof ArrayBuffer !== 'undefined' && typeof Uint8Array !== 'undefined';
var useFromArrayBuffer = useArrayBuffer && (Buffer.prototype instanceof Uint8Array || Buffer.TYPED_ARRAY_SUPPORT);
module.exports = function toBuffer(data, encoding) {
    if (Buffer.isBuffer(data)) {
        if (data.constructor && !('isBuffer' in data)) {
            // probably a SlowBuffer
            return Buffer.from(data);
        }
        return data;
    }
    if (typeof data === 'string') {
        return Buffer.from(data, encoding);
    }
    /*
	 * Wrap any TypedArray instances and DataViews
	 * Makes sense only on engines with full TypedArray support -- let Buffer detect that
	 */ if (useArrayBuffer && isView(data)) {
        // Bug in Node.js <6.3.1, which treats this as out-of-bounds
        if (data.byteLength === 0) {
            return Buffer.alloc(0);
        }
        // When Buffer is based on Uint8Array, we can just construct it from ArrayBuffer
        if (useFromArrayBuffer) {
            var res = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
            /*
			 * Recheck result size, as offset/length doesn't work on Node.js <5.10
			 * We just go to Uint8Array case if this fails
			 */ if (res.byteLength === data.byteLength) {
                return res;
            }
        }
        // Convert to Uint8Array bytes and then to Buffer
        var uint8 = data instanceof Uint8Array ? data : new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
        var result = Buffer.from(uint8);
        /*
		 * Let's recheck that conversion succeeded
		 * We have .length but not .byteLength when useFromArrayBuffer is false
		 */ if (result.length === data.byteLength) {
            return result;
        }
    }
    /*
	 * Uint8Array in engines where Buffer.from might not work with ArrayBuffer, just copy over
	 * Doesn't make sense with other TypedArray instances
	 */ if (useUint8Array && data instanceof Uint8Array) {
        return Buffer.from(data);
    }
    var isArr = isArray(data);
    if (isArr) {
        for(var i = 0; i < data.length; i += 1){
            var x = data[i];
            if (typeof x !== 'number' || x < 0 || x > 255 || ~~x !== x // NaN and integer check
            ) {
                throw new RangeError('Array items must be numbers in the range 0-255.');
            }
        }
    }
    /*
	 * Old Buffer polyfill on an engine that doesn't have TypedArray support
	 * Also, this is from a different Buffer polyfill implementation then we have, as instanceof check failed
	 * Convert to our current Buffer implementation
	 */ if (isArr || Buffer.isBuffer(data) && data.constructor && typeof data.constructor.isBuffer === 'function' && data.constructor.isBuffer(data)) {
        return Buffer.from(data);
    }
    throw new TypeError('The "data" argument must be a string, an Array, a Buffer, a Uint8Array, or a DataView.');
};
}),
"[project]/node_modules/sha.js/hash.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Buffer = __turbopack_context__.r("[project]/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
var toBuffer = __turbopack_context__.r("[project]/node_modules/to-buffer/index.js [app-route] (ecmascript)");
// prototype class for hash functions
function Hash(blockSize, finalSize) {
    this._block = Buffer.alloc(blockSize);
    this._finalSize = finalSize;
    this._blockSize = blockSize;
    this._len = 0;
}
Hash.prototype.update = function(data, enc) {
    /* eslint no-param-reassign: 0 */ data = toBuffer(data, enc || 'utf8');
    var block = this._block;
    var blockSize = this._blockSize;
    var length = data.length;
    var accum = this._len;
    for(var offset = 0; offset < length;){
        var assigned = accum % blockSize;
        var remainder = Math.min(length - offset, blockSize - assigned);
        for(var i = 0; i < remainder; i++){
            block[assigned + i] = data[offset + i];
        }
        accum += remainder;
        offset += remainder;
        if (accum % blockSize === 0) {
            this._update(block);
        }
    }
    this._len += length;
    return this;
};
Hash.prototype.digest = function(enc) {
    var rem = this._len % this._blockSize;
    this._block[rem] = 0x80;
    /*
	 * zero (rem + 1) trailing bits, where (rem + 1) is the smallest
	 * non-negative solution to the equation (length + 1 + (rem + 1)) === finalSize mod blockSize
	 */ this._block.fill(0, rem + 1);
    if (rem >= this._finalSize) {
        this._update(this._block);
        this._block.fill(0);
    }
    var bits = this._len * 8;
    // uint32
    if (bits <= 0xffffffff) {
        this._block.writeUInt32BE(bits, this._blockSize - 4);
    // uint64
    } else {
        var lowBits = (bits & 0xffffffff) >>> 0;
        var highBits = (bits - lowBits) / 0x100000000;
        this._block.writeUInt32BE(highBits, this._blockSize - 8);
        this._block.writeUInt32BE(lowBits, this._blockSize - 4);
    }
    this._update(this._block);
    var hash = this._hash();
    return enc ? hash.toString(enc) : hash;
};
Hash.prototype._update = function() {
    throw new Error('_update must be implemented by subclass');
};
module.exports = Hash;
}),
"[project]/node_modules/sha.js/sha.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-0, as defined
 * in FIPS PUB 180-1
 * This source code is derived from sha1.js of the same repository.
 * The difference between SHA-0 and SHA-1 is just a bitwise rotate left
 * operation was added.
 */ var inherits = __turbopack_context__.r("[project]/node_modules/inherits/inherits.js [app-route] (ecmascript)");
var Hash = __turbopack_context__.r("[project]/node_modules/sha.js/hash.js [app-route] (ecmascript)");
var Buffer = __turbopack_context__.r("[project]/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
var K = [
    0x5a827999,
    0x6ed9eba1,
    0x8f1bbcdc | 0,
    0xca62c1d6 | 0
];
var W = new Array(80);
function Sha() {
    this.init();
    this._w = W;
    Hash.call(this, 64, 56);
}
inherits(Sha, Hash);
Sha.prototype.init = function() {
    this._a = 0x67452301;
    this._b = 0xefcdab89;
    this._c = 0x98badcfe;
    this._d = 0x10325476;
    this._e = 0xc3d2e1f0;
    return this;
};
function rotl5(num) {
    return num << 5 | num >>> 27;
}
function rotl30(num) {
    return num << 30 | num >>> 2;
}
function ft(s, b, c, d) {
    if (s === 0) {
        return b & c | ~b & d;
    }
    if (s === 2) {
        return b & c | b & d | c & d;
    }
    return b ^ c ^ d;
}
Sha.prototype._update = function(M) {
    var w = this._w;
    var a = this._a | 0;
    var b = this._b | 0;
    var c = this._c | 0;
    var d = this._d | 0;
    var e = this._e | 0;
    for(var i = 0; i < 16; ++i){
        w[i] = M.readInt32BE(i * 4);
    }
    for(; i < 80; ++i){
        w[i] = w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16];
    }
    for(var j = 0; j < 80; ++j){
        var s = ~~(j / 20);
        var t = rotl5(a) + ft(s, b, c, d) + e + w[j] + K[s] | 0;
        e = d;
        d = c;
        c = rotl30(b);
        b = a;
        a = t;
    }
    this._a = a + this._a | 0;
    this._b = b + this._b | 0;
    this._c = c + this._c | 0;
    this._d = d + this._d | 0;
    this._e = e + this._e | 0;
};
Sha.prototype._hash = function() {
    var H = Buffer.allocUnsafe(20);
    H.writeInt32BE(this._a | 0, 0);
    H.writeInt32BE(this._b | 0, 4);
    H.writeInt32BE(this._c | 0, 8);
    H.writeInt32BE(this._d | 0, 12);
    H.writeInt32BE(this._e | 0, 16);
    return H;
};
module.exports = Sha;
}),
"[project]/node_modules/sha.js/sha1.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */ var inherits = __turbopack_context__.r("[project]/node_modules/inherits/inherits.js [app-route] (ecmascript)");
var Hash = __turbopack_context__.r("[project]/node_modules/sha.js/hash.js [app-route] (ecmascript)");
var Buffer = __turbopack_context__.r("[project]/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
var K = [
    0x5a827999,
    0x6ed9eba1,
    0x8f1bbcdc | 0,
    0xca62c1d6 | 0
];
var W = new Array(80);
function Sha1() {
    this.init();
    this._w = W;
    Hash.call(this, 64, 56);
}
inherits(Sha1, Hash);
Sha1.prototype.init = function() {
    this._a = 0x67452301;
    this._b = 0xefcdab89;
    this._c = 0x98badcfe;
    this._d = 0x10325476;
    this._e = 0xc3d2e1f0;
    return this;
};
function rotl1(num) {
    return num << 1 | num >>> 31;
}
function rotl5(num) {
    return num << 5 | num >>> 27;
}
function rotl30(num) {
    return num << 30 | num >>> 2;
}
function ft(s, b, c, d) {
    if (s === 0) {
        return b & c | ~b & d;
    }
    if (s === 2) {
        return b & c | b & d | c & d;
    }
    return b ^ c ^ d;
}
Sha1.prototype._update = function(M) {
    var w = this._w;
    var a = this._a | 0;
    var b = this._b | 0;
    var c = this._c | 0;
    var d = this._d | 0;
    var e = this._e | 0;
    for(var i = 0; i < 16; ++i){
        w[i] = M.readInt32BE(i * 4);
    }
    for(; i < 80; ++i){
        w[i] = rotl1(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16]);
    }
    for(var j = 0; j < 80; ++j){
        var s = ~~(j / 20);
        var t = rotl5(a) + ft(s, b, c, d) + e + w[j] + K[s] | 0;
        e = d;
        d = c;
        c = rotl30(b);
        b = a;
        a = t;
    }
    this._a = a + this._a | 0;
    this._b = b + this._b | 0;
    this._c = c + this._c | 0;
    this._d = d + this._d | 0;
    this._e = e + this._e | 0;
};
Sha1.prototype._hash = function() {
    var H = Buffer.allocUnsafe(20);
    H.writeInt32BE(this._a | 0, 0);
    H.writeInt32BE(this._b | 0, 4);
    H.writeInt32BE(this._c | 0, 8);
    H.writeInt32BE(this._d | 0, 12);
    H.writeInt32BE(this._e | 0, 16);
    return H;
};
module.exports = Sha1;
}),
"[project]/node_modules/sha.js/sha256.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */ var inherits = __turbopack_context__.r("[project]/node_modules/inherits/inherits.js [app-route] (ecmascript)");
var Hash = __turbopack_context__.r("[project]/node_modules/sha.js/hash.js [app-route] (ecmascript)");
var Buffer = __turbopack_context__.r("[project]/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
var K = [
    0x428A2F98,
    0x71374491,
    0xB5C0FBCF,
    0xE9B5DBA5,
    0x3956C25B,
    0x59F111F1,
    0x923F82A4,
    0xAB1C5ED5,
    0xD807AA98,
    0x12835B01,
    0x243185BE,
    0x550C7DC3,
    0x72BE5D74,
    0x80DEB1FE,
    0x9BDC06A7,
    0xC19BF174,
    0xE49B69C1,
    0xEFBE4786,
    0x0FC19DC6,
    0x240CA1CC,
    0x2DE92C6F,
    0x4A7484AA,
    0x5CB0A9DC,
    0x76F988DA,
    0x983E5152,
    0xA831C66D,
    0xB00327C8,
    0xBF597FC7,
    0xC6E00BF3,
    0xD5A79147,
    0x06CA6351,
    0x14292967,
    0x27B70A85,
    0x2E1B2138,
    0x4D2C6DFC,
    0x53380D13,
    0x650A7354,
    0x766A0ABB,
    0x81C2C92E,
    0x92722C85,
    0xA2BFE8A1,
    0xA81A664B,
    0xC24B8B70,
    0xC76C51A3,
    0xD192E819,
    0xD6990624,
    0xF40E3585,
    0x106AA070,
    0x19A4C116,
    0x1E376C08,
    0x2748774C,
    0x34B0BCB5,
    0x391C0CB3,
    0x4ED8AA4A,
    0x5B9CCA4F,
    0x682E6FF3,
    0x748F82EE,
    0x78A5636F,
    0x84C87814,
    0x8CC70208,
    0x90BEFFFA,
    0xA4506CEB,
    0xBEF9A3F7,
    0xC67178F2
];
var W = new Array(64);
function Sha256() {
    this.init();
    this._w = W; // new Array(64)
    Hash.call(this, 64, 56);
}
inherits(Sha256, Hash);
Sha256.prototype.init = function() {
    this._a = 0x6a09e667;
    this._b = 0xbb67ae85;
    this._c = 0x3c6ef372;
    this._d = 0xa54ff53a;
    this._e = 0x510e527f;
    this._f = 0x9b05688c;
    this._g = 0x1f83d9ab;
    this._h = 0x5be0cd19;
    return this;
};
function ch(x, y, z) {
    return z ^ x & (y ^ z);
}
function maj(x, y, z) {
    return x & y | z & (x | y);
}
function sigma0(x) {
    return (x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10);
}
function sigma1(x) {
    return (x >>> 6 | x << 26) ^ (x >>> 11 | x << 21) ^ (x >>> 25 | x << 7);
}
function gamma0(x) {
    return (x >>> 7 | x << 25) ^ (x >>> 18 | x << 14) ^ x >>> 3;
}
function gamma1(x) {
    return (x >>> 17 | x << 15) ^ (x >>> 19 | x << 13) ^ x >>> 10;
}
Sha256.prototype._update = function(M) {
    var w = this._w;
    var a = this._a | 0;
    var b = this._b | 0;
    var c = this._c | 0;
    var d = this._d | 0;
    var e = this._e | 0;
    var f = this._f | 0;
    var g = this._g | 0;
    var h = this._h | 0;
    for(var i = 0; i < 16; ++i){
        w[i] = M.readInt32BE(i * 4);
    }
    for(; i < 64; ++i){
        w[i] = gamma1(w[i - 2]) + w[i - 7] + gamma0(w[i - 15]) + w[i - 16] | 0;
    }
    for(var j = 0; j < 64; ++j){
        var T1 = h + sigma1(e) + ch(e, f, g) + K[j] + w[j] | 0;
        var T2 = sigma0(a) + maj(a, b, c) | 0;
        h = g;
        g = f;
        f = e;
        e = d + T1 | 0;
        d = c;
        c = b;
        b = a;
        a = T1 + T2 | 0;
    }
    this._a = a + this._a | 0;
    this._b = b + this._b | 0;
    this._c = c + this._c | 0;
    this._d = d + this._d | 0;
    this._e = e + this._e | 0;
    this._f = f + this._f | 0;
    this._g = g + this._g | 0;
    this._h = h + this._h | 0;
};
Sha256.prototype._hash = function() {
    var H = Buffer.allocUnsafe(32);
    H.writeInt32BE(this._a, 0);
    H.writeInt32BE(this._b, 4);
    H.writeInt32BE(this._c, 8);
    H.writeInt32BE(this._d, 12);
    H.writeInt32BE(this._e, 16);
    H.writeInt32BE(this._f, 20);
    H.writeInt32BE(this._g, 24);
    H.writeInt32BE(this._h, 28);
    return H;
};
module.exports = Sha256;
}),
"[project]/node_modules/sha.js/sha224.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */ var inherits = __turbopack_context__.r("[project]/node_modules/inherits/inherits.js [app-route] (ecmascript)");
var Sha256 = __turbopack_context__.r("[project]/node_modules/sha.js/sha256.js [app-route] (ecmascript)");
var Hash = __turbopack_context__.r("[project]/node_modules/sha.js/hash.js [app-route] (ecmascript)");
var Buffer = __turbopack_context__.r("[project]/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
var W = new Array(64);
function Sha224() {
    this.init();
    this._w = W; // new Array(64)
    Hash.call(this, 64, 56);
}
inherits(Sha224, Sha256);
Sha224.prototype.init = function() {
    this._a = 0xc1059ed8;
    this._b = 0x367cd507;
    this._c = 0x3070dd17;
    this._d = 0xf70e5939;
    this._e = 0xffc00b31;
    this._f = 0x68581511;
    this._g = 0x64f98fa7;
    this._h = 0xbefa4fa4;
    return this;
};
Sha224.prototype._hash = function() {
    var H = Buffer.allocUnsafe(28);
    H.writeInt32BE(this._a, 0);
    H.writeInt32BE(this._b, 4);
    H.writeInt32BE(this._c, 8);
    H.writeInt32BE(this._d, 12);
    H.writeInt32BE(this._e, 16);
    H.writeInt32BE(this._f, 20);
    H.writeInt32BE(this._g, 24);
    return H;
};
module.exports = Sha224;
}),
"[project]/node_modules/sha.js/sha512.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var inherits = __turbopack_context__.r("[project]/node_modules/inherits/inherits.js [app-route] (ecmascript)");
var Hash = __turbopack_context__.r("[project]/node_modules/sha.js/hash.js [app-route] (ecmascript)");
var Buffer = __turbopack_context__.r("[project]/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
var K = [
    0x428a2f98,
    0xd728ae22,
    0x71374491,
    0x23ef65cd,
    0xb5c0fbcf,
    0xec4d3b2f,
    0xe9b5dba5,
    0x8189dbbc,
    0x3956c25b,
    0xf348b538,
    0x59f111f1,
    0xb605d019,
    0x923f82a4,
    0xaf194f9b,
    0xab1c5ed5,
    0xda6d8118,
    0xd807aa98,
    0xa3030242,
    0x12835b01,
    0x45706fbe,
    0x243185be,
    0x4ee4b28c,
    0x550c7dc3,
    0xd5ffb4e2,
    0x72be5d74,
    0xf27b896f,
    0x80deb1fe,
    0x3b1696b1,
    0x9bdc06a7,
    0x25c71235,
    0xc19bf174,
    0xcf692694,
    0xe49b69c1,
    0x9ef14ad2,
    0xefbe4786,
    0x384f25e3,
    0x0fc19dc6,
    0x8b8cd5b5,
    0x240ca1cc,
    0x77ac9c65,
    0x2de92c6f,
    0x592b0275,
    0x4a7484aa,
    0x6ea6e483,
    0x5cb0a9dc,
    0xbd41fbd4,
    0x76f988da,
    0x831153b5,
    0x983e5152,
    0xee66dfab,
    0xa831c66d,
    0x2db43210,
    0xb00327c8,
    0x98fb213f,
    0xbf597fc7,
    0xbeef0ee4,
    0xc6e00bf3,
    0x3da88fc2,
    0xd5a79147,
    0x930aa725,
    0x06ca6351,
    0xe003826f,
    0x14292967,
    0x0a0e6e70,
    0x27b70a85,
    0x46d22ffc,
    0x2e1b2138,
    0x5c26c926,
    0x4d2c6dfc,
    0x5ac42aed,
    0x53380d13,
    0x9d95b3df,
    0x650a7354,
    0x8baf63de,
    0x766a0abb,
    0x3c77b2a8,
    0x81c2c92e,
    0x47edaee6,
    0x92722c85,
    0x1482353b,
    0xa2bfe8a1,
    0x4cf10364,
    0xa81a664b,
    0xbc423001,
    0xc24b8b70,
    0xd0f89791,
    0xc76c51a3,
    0x0654be30,
    0xd192e819,
    0xd6ef5218,
    0xd6990624,
    0x5565a910,
    0xf40e3585,
    0x5771202a,
    0x106aa070,
    0x32bbd1b8,
    0x19a4c116,
    0xb8d2d0c8,
    0x1e376c08,
    0x5141ab53,
    0x2748774c,
    0xdf8eeb99,
    0x34b0bcb5,
    0xe19b48a8,
    0x391c0cb3,
    0xc5c95a63,
    0x4ed8aa4a,
    0xe3418acb,
    0x5b9cca4f,
    0x7763e373,
    0x682e6ff3,
    0xd6b2b8a3,
    0x748f82ee,
    0x5defb2fc,
    0x78a5636f,
    0x43172f60,
    0x84c87814,
    0xa1f0ab72,
    0x8cc70208,
    0x1a6439ec,
    0x90befffa,
    0x23631e28,
    0xa4506ceb,
    0xde82bde9,
    0xbef9a3f7,
    0xb2c67915,
    0xc67178f2,
    0xe372532b,
    0xca273ece,
    0xea26619c,
    0xd186b8c7,
    0x21c0c207,
    0xeada7dd6,
    0xcde0eb1e,
    0xf57d4f7f,
    0xee6ed178,
    0x06f067aa,
    0x72176fba,
    0x0a637dc5,
    0xa2c898a6,
    0x113f9804,
    0xbef90dae,
    0x1b710b35,
    0x131c471b,
    0x28db77f5,
    0x23047d84,
    0x32caab7b,
    0x40c72493,
    0x3c9ebe0a,
    0x15c9bebc,
    0x431d67c4,
    0x9c100d4c,
    0x4cc5d4be,
    0xcb3e42b6,
    0x597f299c,
    0xfc657e2a,
    0x5fcb6fab,
    0x3ad6faec,
    0x6c44198c,
    0x4a475817
];
var W = new Array(160);
function Sha512() {
    this.init();
    this._w = W;
    Hash.call(this, 128, 112);
}
inherits(Sha512, Hash);
Sha512.prototype.init = function() {
    this._ah = 0x6a09e667;
    this._bh = 0xbb67ae85;
    this._ch = 0x3c6ef372;
    this._dh = 0xa54ff53a;
    this._eh = 0x510e527f;
    this._fh = 0x9b05688c;
    this._gh = 0x1f83d9ab;
    this._hh = 0x5be0cd19;
    this._al = 0xf3bcc908;
    this._bl = 0x84caa73b;
    this._cl = 0xfe94f82b;
    this._dl = 0x5f1d36f1;
    this._el = 0xade682d1;
    this._fl = 0x2b3e6c1f;
    this._gl = 0xfb41bd6b;
    this._hl = 0x137e2179;
    return this;
};
function Ch(x, y, z) {
    return z ^ x & (y ^ z);
}
function maj(x, y, z) {
    return x & y | z & (x | y);
}
function sigma0(x, xl) {
    return (x >>> 28 | xl << 4) ^ (xl >>> 2 | x << 30) ^ (xl >>> 7 | x << 25);
}
function sigma1(x, xl) {
    return (x >>> 14 | xl << 18) ^ (x >>> 18 | xl << 14) ^ (xl >>> 9 | x << 23);
}
function Gamma0(x, xl) {
    return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ x >>> 7;
}
function Gamma0l(x, xl) {
    return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7 | xl << 25);
}
function Gamma1(x, xl) {
    return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ x >>> 6;
}
function Gamma1l(x, xl) {
    return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6 | xl << 26);
}
function getCarry(a, b) {
    return a >>> 0 < b >>> 0 ? 1 : 0;
}
Sha512.prototype._update = function(M) {
    var w = this._w;
    var ah = this._ah | 0;
    var bh = this._bh | 0;
    var ch = this._ch | 0;
    var dh = this._dh | 0;
    var eh = this._eh | 0;
    var fh = this._fh | 0;
    var gh = this._gh | 0;
    var hh = this._hh | 0;
    var al = this._al | 0;
    var bl = this._bl | 0;
    var cl = this._cl | 0;
    var dl = this._dl | 0;
    var el = this._el | 0;
    var fl = this._fl | 0;
    var gl = this._gl | 0;
    var hl = this._hl | 0;
    for(var i = 0; i < 32; i += 2){
        w[i] = M.readInt32BE(i * 4);
        w[i + 1] = M.readInt32BE(i * 4 + 4);
    }
    for(; i < 160; i += 2){
        var xh = w[i - 15 * 2];
        var xl = w[i - 15 * 2 + 1];
        var gamma0 = Gamma0(xh, xl);
        var gamma0l = Gamma0l(xl, xh);
        xh = w[i - 2 * 2];
        xl = w[i - 2 * 2 + 1];
        var gamma1 = Gamma1(xh, xl);
        var gamma1l = Gamma1l(xl, xh);
        // w[i] = gamma0 + w[i - 7] + gamma1 + w[i - 16]
        var Wi7h = w[i - 7 * 2];
        var Wi7l = w[i - 7 * 2 + 1];
        var Wi16h = w[i - 16 * 2];
        var Wi16l = w[i - 16 * 2 + 1];
        var Wil = gamma0l + Wi7l | 0;
        var Wih = gamma0 + Wi7h + getCarry(Wil, gamma0l) | 0;
        Wil = Wil + gamma1l | 0;
        Wih = Wih + gamma1 + getCarry(Wil, gamma1l) | 0;
        Wil = Wil + Wi16l | 0;
        Wih = Wih + Wi16h + getCarry(Wil, Wi16l) | 0;
        w[i] = Wih;
        w[i + 1] = Wil;
    }
    for(var j = 0; j < 160; j += 2){
        Wih = w[j];
        Wil = w[j + 1];
        var majh = maj(ah, bh, ch);
        var majl = maj(al, bl, cl);
        var sigma0h = sigma0(ah, al);
        var sigma0l = sigma0(al, ah);
        var sigma1h = sigma1(eh, el);
        var sigma1l = sigma1(el, eh);
        // t1 = h + sigma1 + ch + K[j] + w[j]
        var Kih = K[j];
        var Kil = K[j + 1];
        var chh = Ch(eh, fh, gh);
        var chl = Ch(el, fl, gl);
        var t1l = hl + sigma1l | 0;
        var t1h = hh + sigma1h + getCarry(t1l, hl) | 0;
        t1l = t1l + chl | 0;
        t1h = t1h + chh + getCarry(t1l, chl) | 0;
        t1l = t1l + Kil | 0;
        t1h = t1h + Kih + getCarry(t1l, Kil) | 0;
        t1l = t1l + Wil | 0;
        t1h = t1h + Wih + getCarry(t1l, Wil) | 0;
        // t2 = sigma0 + maj
        var t2l = sigma0l + majl | 0;
        var t2h = sigma0h + majh + getCarry(t2l, sigma0l) | 0;
        hh = gh;
        hl = gl;
        gh = fh;
        gl = fl;
        fh = eh;
        fl = el;
        el = dl + t1l | 0;
        eh = dh + t1h + getCarry(el, dl) | 0;
        dh = ch;
        dl = cl;
        ch = bh;
        cl = bl;
        bh = ah;
        bl = al;
        al = t1l + t2l | 0;
        ah = t1h + t2h + getCarry(al, t1l) | 0;
    }
    this._al = this._al + al | 0;
    this._bl = this._bl + bl | 0;
    this._cl = this._cl + cl | 0;
    this._dl = this._dl + dl | 0;
    this._el = this._el + el | 0;
    this._fl = this._fl + fl | 0;
    this._gl = this._gl + gl | 0;
    this._hl = this._hl + hl | 0;
    this._ah = this._ah + ah + getCarry(this._al, al) | 0;
    this._bh = this._bh + bh + getCarry(this._bl, bl) | 0;
    this._ch = this._ch + ch + getCarry(this._cl, cl) | 0;
    this._dh = this._dh + dh + getCarry(this._dl, dl) | 0;
    this._eh = this._eh + eh + getCarry(this._el, el) | 0;
    this._fh = this._fh + fh + getCarry(this._fl, fl) | 0;
    this._gh = this._gh + gh + getCarry(this._gl, gl) | 0;
    this._hh = this._hh + hh + getCarry(this._hl, hl) | 0;
};
Sha512.prototype._hash = function() {
    var H = Buffer.allocUnsafe(64);
    function writeInt64BE(h, l, offset) {
        H.writeInt32BE(h, offset);
        H.writeInt32BE(l, offset + 4);
    }
    writeInt64BE(this._ah, this._al, 0);
    writeInt64BE(this._bh, this._bl, 8);
    writeInt64BE(this._ch, this._cl, 16);
    writeInt64BE(this._dh, this._dl, 24);
    writeInt64BE(this._eh, this._el, 32);
    writeInt64BE(this._fh, this._fl, 40);
    writeInt64BE(this._gh, this._gl, 48);
    writeInt64BE(this._hh, this._hl, 56);
    return H;
};
module.exports = Sha512;
}),
"[project]/node_modules/sha.js/sha384.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var inherits = __turbopack_context__.r("[project]/node_modules/inherits/inherits.js [app-route] (ecmascript)");
var SHA512 = __turbopack_context__.r("[project]/node_modules/sha.js/sha512.js [app-route] (ecmascript)");
var Hash = __turbopack_context__.r("[project]/node_modules/sha.js/hash.js [app-route] (ecmascript)");
var Buffer = __turbopack_context__.r("[project]/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
var W = new Array(160);
function Sha384() {
    this.init();
    this._w = W;
    Hash.call(this, 128, 112);
}
inherits(Sha384, SHA512);
Sha384.prototype.init = function() {
    this._ah = 0xcbbb9d5d;
    this._bh = 0x629a292a;
    this._ch = 0x9159015a;
    this._dh = 0x152fecd8;
    this._eh = 0x67332667;
    this._fh = 0x8eb44a87;
    this._gh = 0xdb0c2e0d;
    this._hh = 0x47b5481d;
    this._al = 0xc1059ed8;
    this._bl = 0x367cd507;
    this._cl = 0x3070dd17;
    this._dl = 0xf70e5939;
    this._el = 0xffc00b31;
    this._fl = 0x68581511;
    this._gl = 0x64f98fa7;
    this._hl = 0xbefa4fa4;
    return this;
};
Sha384.prototype._hash = function() {
    var H = Buffer.allocUnsafe(48);
    function writeInt64BE(h, l, offset) {
        H.writeInt32BE(h, offset);
        H.writeInt32BE(l, offset + 4);
    }
    writeInt64BE(this._ah, this._al, 0);
    writeInt64BE(this._bh, this._bl, 8);
    writeInt64BE(this._ch, this._cl, 16);
    writeInt64BE(this._dh, this._dl, 24);
    writeInt64BE(this._eh, this._el, 32);
    writeInt64BE(this._fh, this._fl, 40);
    return H;
};
module.exports = Sha384;
}),
"[project]/node_modules/sha.js/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = function SHA(algorithm) {
    var alg = algorithm.toLowerCase();
    var Algorithm = module.exports[alg];
    if (!Algorithm) {
        throw new Error(alg + ' is not supported (we accept pull requests)');
    }
    return new Algorithm();
};
module.exports.sha = __turbopack_context__.r("[project]/node_modules/sha.js/sha.js [app-route] (ecmascript)");
module.exports.sha1 = __turbopack_context__.r("[project]/node_modules/sha.js/sha1.js [app-route] (ecmascript)");
module.exports.sha224 = __turbopack_context__.r("[project]/node_modules/sha.js/sha224.js [app-route] (ecmascript)");
module.exports.sha256 = __turbopack_context__.r("[project]/node_modules/sha.js/sha256.js [app-route] (ecmascript)");
module.exports.sha384 = __turbopack_context__.r("[project]/node_modules/sha.js/sha384.js [app-route] (ecmascript)");
module.exports.sha512 = __turbopack_context__.r("[project]/node_modules/sha.js/sha512.js [app-route] (ecmascript)");
}),
"[project]/node_modules/@apollo/utils.createhash/dist/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createHash = void 0;
const utils_isnodelike_1 = __turbopack_context__.r("[project]/node_modules/@apollo/utils.isnodelike/dist/index.js [app-route] (ecmascript)");
function createHash(kind) {
    if (utils_isnodelike_1.isNodeLike && module.require) {
        return module.require("crypto").createHash(kind);
    }
    return __turbopack_context__.r("[project]/node_modules/sha.js/index.js [app-route] (ecmascript)")(kind);
}
exports.createHash = createHash; //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/whatwg-mimetype/lib/utils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

exports.removeLeadingAndTrailingHTTPWhitespace = (string)=>{
    return string.replace(/^[ \t\n\r]+/u, "").replace(/[ \t\n\r]+$/u, "");
};
exports.removeTrailingHTTPWhitespace = (string)=>{
    return string.replace(/[ \t\n\r]+$/u, "");
};
exports.isHTTPWhitespaceChar = (char)=>{
    return char === " " || char === "\t" || char === "\n" || char === "\r";
};
exports.solelyContainsHTTPTokenCodePoints = (string)=>{
    return /^[-!#$%&'*+.^_`|~A-Za-z0-9]*$/u.test(string);
};
exports.soleyContainsHTTPQuotedStringTokenCodePoints = (string)=>{
    return /^[\t\u0020-\u007E\u0080-\u00FF]*$/u.test(string);
};
exports.asciiLowercase = (string)=>{
    return string.replace(/[A-Z]/ug, (l)=>l.toLowerCase());
};
// This variant only implements it with the extract-value flag set.
exports.collectAnHTTPQuotedString = (input, position)=>{
    let value = "";
    position++;
    while(true){
        while(position < input.length && input[position] !== "\"" && input[position] !== "\\"){
            value += input[position];
            ++position;
        }
        if (position >= input.length) {
            break;
        }
        const quoteOrBackslash = input[position];
        ++position;
        if (quoteOrBackslash === "\\") {
            if (position >= input.length) {
                value += "\\";
                break;
            }
            value += input[position];
            ++position;
        } else {
            break;
        }
    }
    return [
        value,
        position
    ];
};
}),
"[project]/node_modules/whatwg-mimetype/lib/mime-type-parameters.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { asciiLowercase, solelyContainsHTTPTokenCodePoints, soleyContainsHTTPQuotedStringTokenCodePoints } = __turbopack_context__.r("[project]/node_modules/whatwg-mimetype/lib/utils.js [app-route] (ecmascript)");
module.exports = class MIMETypeParameters {
    constructor(map){
        this._map = map;
    }
    get size() {
        return this._map.size;
    }
    get(name) {
        name = asciiLowercase(String(name));
        return this._map.get(name);
    }
    has(name) {
        name = asciiLowercase(String(name));
        return this._map.has(name);
    }
    set(name, value) {
        name = asciiLowercase(String(name));
        value = String(value);
        if (!solelyContainsHTTPTokenCodePoints(name)) {
            throw new Error(`Invalid MIME type parameter name "${name}": only HTTP token code points are valid.`);
        }
        if (!soleyContainsHTTPQuotedStringTokenCodePoints(value)) {
            throw new Error(`Invalid MIME type parameter value "${value}": only HTTP quoted-string token code points are ` + `valid.`);
        }
        return this._map.set(name, value);
    }
    clear() {
        this._map.clear();
    }
    delete(name) {
        name = asciiLowercase(String(name));
        return this._map.delete(name);
    }
    forEach(callbackFn, thisArg) {
        this._map.forEach(callbackFn, thisArg);
    }
    keys() {
        return this._map.keys();
    }
    values() {
        return this._map.values();
    }
    entries() {
        return this._map.entries();
    }
    [Symbol.iterator]() {
        return this._map[Symbol.iterator]();
    }
};
}),
"[project]/node_modules/whatwg-mimetype/lib/parser.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { removeLeadingAndTrailingHTTPWhitespace, removeTrailingHTTPWhitespace, isHTTPWhitespaceChar, solelyContainsHTTPTokenCodePoints, soleyContainsHTTPQuotedStringTokenCodePoints, asciiLowercase, collectAnHTTPQuotedString } = __turbopack_context__.r("[project]/node_modules/whatwg-mimetype/lib/utils.js [app-route] (ecmascript)");
module.exports = (input)=>{
    input = removeLeadingAndTrailingHTTPWhitespace(input);
    let position = 0;
    let type = "";
    while(position < input.length && input[position] !== "/"){
        type += input[position];
        ++position;
    }
    if (type.length === 0 || !solelyContainsHTTPTokenCodePoints(type)) {
        return null;
    }
    if (position >= input.length) {
        return null;
    }
    // Skips past "/"
    ++position;
    let subtype = "";
    while(position < input.length && input[position] !== ";"){
        subtype += input[position];
        ++position;
    }
    subtype = removeTrailingHTTPWhitespace(subtype);
    if (subtype.length === 0 || !solelyContainsHTTPTokenCodePoints(subtype)) {
        return null;
    }
    const mimeType = {
        type: asciiLowercase(type),
        subtype: asciiLowercase(subtype),
        parameters: new Map()
    };
    while(position < input.length){
        // Skip past ";"
        ++position;
        while(isHTTPWhitespaceChar(input[position])){
            ++position;
        }
        let parameterName = "";
        while(position < input.length && input[position] !== ";" && input[position] !== "="){
            parameterName += input[position];
            ++position;
        }
        parameterName = asciiLowercase(parameterName);
        if (position < input.length) {
            if (input[position] === ";") {
                continue;
            }
            // Skip past "="
            ++position;
        }
        let parameterValue = null;
        if (input[position] === "\"") {
            [parameterValue, position] = collectAnHTTPQuotedString(input, position);
            while(position < input.length && input[position] !== ";"){
                ++position;
            }
        } else {
            parameterValue = "";
            while(position < input.length && input[position] !== ";"){
                parameterValue += input[position];
                ++position;
            }
            parameterValue = removeTrailingHTTPWhitespace(parameterValue);
            if (parameterValue === "") {
                continue;
            }
        }
        if (parameterName.length > 0 && solelyContainsHTTPTokenCodePoints(parameterName) && soleyContainsHTTPQuotedStringTokenCodePoints(parameterValue) && !mimeType.parameters.has(parameterName)) {
            mimeType.parameters.set(parameterName, parameterValue);
        }
    }
    return mimeType;
};
}),
"[project]/node_modules/whatwg-mimetype/lib/serializer.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { solelyContainsHTTPTokenCodePoints } = __turbopack_context__.r("[project]/node_modules/whatwg-mimetype/lib/utils.js [app-route] (ecmascript)");
module.exports = (mimeType)=>{
    let serialization = `${mimeType.type}/${mimeType.subtype}`;
    if (mimeType.parameters.size === 0) {
        return serialization;
    }
    for (let [name, value] of mimeType.parameters){
        serialization += ";";
        serialization += name;
        serialization += "=";
        if (!solelyContainsHTTPTokenCodePoints(value) || value.length === 0) {
            value = value.replace(/(["\\])/ug, "\\$1");
            value = `"${value}"`;
        }
        serialization += value;
    }
    return serialization;
};
}),
"[project]/node_modules/whatwg-mimetype/lib/mime-type.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const MIMETypeParameters = __turbopack_context__.r("[project]/node_modules/whatwg-mimetype/lib/mime-type-parameters.js [app-route] (ecmascript)");
const parse = __turbopack_context__.r("[project]/node_modules/whatwg-mimetype/lib/parser.js [app-route] (ecmascript)");
const serialize = __turbopack_context__.r("[project]/node_modules/whatwg-mimetype/lib/serializer.js [app-route] (ecmascript)");
const { asciiLowercase, solelyContainsHTTPTokenCodePoints } = __turbopack_context__.r("[project]/node_modules/whatwg-mimetype/lib/utils.js [app-route] (ecmascript)");
module.exports = class MIMEType {
    constructor(string){
        string = String(string);
        const result = parse(string);
        if (result === null) {
            throw new Error(`Could not parse MIME type string "${string}"`);
        }
        this._type = result.type;
        this._subtype = result.subtype;
        this._parameters = new MIMETypeParameters(result.parameters);
    }
    static parse(string) {
        try {
            return new this(string);
        } catch (e) {
            return null;
        }
    }
    get essence() {
        return `${this.type}/${this.subtype}`;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        value = asciiLowercase(String(value));
        if (value.length === 0) {
            throw new Error("Invalid type: must be a non-empty string");
        }
        if (!solelyContainsHTTPTokenCodePoints(value)) {
            throw new Error(`Invalid type ${value}: must contain only HTTP token code points`);
        }
        this._type = value;
    }
    get subtype() {
        return this._subtype;
    }
    set subtype(value) {
        value = asciiLowercase(String(value));
        if (value.length === 0) {
            throw new Error("Invalid subtype: must be a non-empty string");
        }
        if (!solelyContainsHTTPTokenCodePoints(value)) {
            throw new Error(`Invalid subtype ${value}: must contain only HTTP token code points`);
        }
        this._subtype = value;
    }
    get parameters() {
        return this._parameters;
    }
    toString() {
        // The serialize function works on both "MIME type records" (i.e. the results of parse) and on this class, since
        // this class's interface is identical.
        return serialize(this);
    }
    isJavaScript({ prohibitParameters = false } = {}) {
        switch(this._type){
            case "text":
                {
                    switch(this._subtype){
                        case "ecmascript":
                        case "javascript":
                        case "javascript1.0":
                        case "javascript1.1":
                        case "javascript1.2":
                        case "javascript1.3":
                        case "javascript1.4":
                        case "javascript1.5":
                        case "jscript":
                        case "livescript":
                        case "x-ecmascript":
                        case "x-javascript":
                            {
                                return !prohibitParameters || this._parameters.size === 0;
                            }
                        default:
                            {
                                return false;
                            }
                    }
                }
            case "application":
                {
                    switch(this._subtype){
                        case "ecmascript":
                        case "javascript":
                        case "x-ecmascript":
                        case "x-javascript":
                            {
                                return !prohibitParameters || this._parameters.size === 0;
                            }
                        default:
                            {
                                return false;
                            }
                    }
                }
            default:
                {
                    return false;
                }
        }
    }
    isXML() {
        return this._subtype === "xml" && (this._type === "text" || this._type === "application") || this._subtype.endsWith("+xml");
    }
    isHTML() {
        return this._subtype === "html" && this._type === "text";
    }
};
}),
"[project]/node_modules/@as-integrations/next/dist/lib/isNextApiRequest.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isNextApiRequest = void 0;
var isNextApiRequest = function(req) {
    return 'query' in req;
};
exports.isNextApiRequest = isNextApiRequest;
}),
"[project]/node_modules/@as-integrations/next/dist/lib/getBody.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__generator || function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getBody = void 0;
var isNextApiRequest_1 = __turbopack_context__.r("[project]/node_modules/@as-integrations/next/dist/lib/isNextApiRequest.js [app-route] (ecmascript)");
var getBody = function(req) {
    return __awaiter(void 0, void 0, void 0, function() {
        return __generator(this, function(_a) {
            if ((0, isNextApiRequest_1.isNextApiRequest)(req)) {
                return [
                    2 /*return*/ ,
                    req.body
                ];
            }
            return [
                2 /*return*/ ,
                req.headers.get('content-type') === 'application/json' ? req.json() : req.text()
            ];
        });
    });
};
exports.getBody = getBody;
}),
"[project]/node_modules/@as-integrations/next/dist/lib/getHeaders.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __values = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__values || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getHeaders = void 0;
var isNextApiRequest_1 = __turbopack_context__.r("[project]/node_modules/@as-integrations/next/dist/lib/isNextApiRequest.js [app-route] (ecmascript)");
var server_1 = __turbopack_context__.r("[project]/node_modules/@apollo/server/dist/cjs/index.js [app-route] (ecmascript)");
var getHeaders = function(req) {
    var e_1, _a;
    var headers = new server_1.HeaderMap();
    if ((0, isNextApiRequest_1.isNextApiRequest)(req)) {
        try {
            for(var _b = __values(Object.entries(req.headers)), _c = _b.next(); !_c.done; _c = _b.next()){
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                if (typeof value === 'string') {
                    headers.set(key, value);
                }
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally{
                if (e_1) throw e_1.error;
            }
        }
    } else {
        req.headers.forEach(function(value, key) {
            headers.set(key, value);
        });
    }
    return headers;
};
exports.getHeaders = getHeaders;
}),
"[project]/node_modules/@as-integrations/next/dist/startServerAndCreateNextHandler.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__generator || function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
var __values = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__values || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.startServerAndCreateNextHandler = startServerAndCreateNextHandler;
var getBody_1 = __turbopack_context__.r("[project]/node_modules/@as-integrations/next/dist/lib/getBody.js [app-route] (ecmascript)");
var getHeaders_1 = __turbopack_context__.r("[project]/node_modules/@as-integrations/next/dist/lib/getHeaders.js [app-route] (ecmascript)");
var isNextApiRequest_1 = __turbopack_context__.r("[project]/node_modules/@as-integrations/next/dist/lib/isNextApiRequest.js [app-route] (ecmascript)");
var stream_1 = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
var url_1 = __turbopack_context__.r("[externals]/url [external] (url, cjs)");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var defaultContext = function() {
    return __awaiter(void 0, void 0, void 0, function() {
        return __generator(this, function(_a) {
            return [
                2 /*return*/ ,
                {}
            ];
        });
    });
};
function startServerAndCreateNextHandler(server, options) {
    server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();
    var contextFunction = (options === null || options === void 0 ? void 0 : options.context) || defaultContext;
    function handler(req, res) {
        return __awaiter(this, void 0, void 0, function() {
            var httpGraphQLResponse, _a, _b, _c, _d, _e, key, value, headers, _f, _g, _h, key, value;
            var _j, _k, e_1, _l, e_2, _m;
            return __generator(this, function(_o) {
                switch(_o.label){
                    case 0:
                        _b = (_a = server).executeHTTPGraphQLRequest;
                        _j = {
                            context: function() {
                                return contextFunction(req, res);
                            }
                        };
                        _k = {};
                        return [
                            4 /*yield*/ ,
                            (0, getBody_1.getBody)(req)
                        ];
                    case 1:
                        return [
                            4 /*yield*/ ,
                            _b.apply(_a, [
                                (_j.httpGraphQLRequest = (_k.body = _o.sent(), _k.headers = (0, getHeaders_1.getHeaders)(req), _k.method = req.method || 'POST', _k.search = req.url ? (0, url_1.parse)(req.url).search || '' : '', _k), _j)
                            ])
                        ];
                    case 2:
                        httpGraphQLResponse = _o.sent();
                        if ((0, isNextApiRequest_1.isNextApiRequest)(req)) {
                            if (!res) {
                                throw new Error('API Routes require you to pass both the req and res object.');
                            }
                            try {
                                for(_c = __values(httpGraphQLResponse.headers), _d = _c.next(); !_d.done; _d = _c.next()){
                                    _e = __read(_d.value, 2), key = _e[0], value = _e[1];
                                    res.setHeader(key, value);
                                }
                            } catch (e_1_1) {
                                e_1 = {
                                    error: e_1_1
                                };
                            } finally{
                                try {
                                    if (_d && !_d.done && (_l = _c.return)) _l.call(_c);
                                } finally{
                                    if (e_1) throw e_1.error;
                                }
                            }
                            res.statusCode = httpGraphQLResponse.status || 200;
                            if (httpGraphQLResponse.body.kind === 'complete') {
                                res.send(httpGraphQLResponse.body.string);
                                res.end();
                            } else {
                                res.send(stream_1.Readable.from(httpGraphQLResponse.body.asyncIterator));
                            }
                            return [
                                2 /*return*/ 
                            ];
                        }
                        headers = {};
                        try {
                            for(_f = __values(httpGraphQLResponse.headers), _g = _f.next(); !_g.done; _g = _f.next()){
                                _h = __read(_g.value, 2), key = _h[0], value = _h[1];
                                headers[key] = value;
                            }
                        } catch (e_2_1) {
                            e_2 = {
                                error: e_2_1
                            };
                        } finally{
                            try {
                                if (_g && !_g.done && (_m = _f.return)) _m.call(_f);
                            } finally{
                                if (e_2) throw e_2.error;
                            }
                        }
                        // eslint-disable-next-line consistent-return
                        return [
                            2 /*return*/ ,
                            new Response(httpGraphQLResponse.body.kind === 'complete' ? httpGraphQLResponse.body.string : new ReadableStream({
                                pull: function(controller) {
                                    return __awaiter(this, void 0, void 0, function() {
                                        var _a, value, done;
                                        return __generator(this, function(_b) {
                                            switch(_b.label){
                                                case 0:
                                                    if (!(httpGraphQLResponse.body.kind === 'chunked')) return [
                                                        3 /*break*/ ,
                                                        2
                                                    ];
                                                    return [
                                                        4 /*yield*/ ,
                                                        httpGraphQLResponse.body.asyncIterator.next()
                                                    ];
                                                case 1:
                                                    _a = _b.sent(), value = _a.value, done = _a.done;
                                                    if (done) {
                                                        controller.close();
                                                    } else {
                                                        controller.enqueue(value);
                                                    }
                                                    _b.label = 2;
                                                case 2:
                                                    return [
                                                        2 /*return*/ 
                                                    ];
                                            }
                                        });
                                    });
                                }
                            }), {
                                headers: headers,
                                status: httpGraphQLResponse.status || 200
                            })
                        ];
                }
            });
        });
    }
    return handler;
}
}),
"[project]/node_modules/@as-integrations/next/dist/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/node_modules/@as-integrations/next/dist/startServerAndCreateNextHandler.js [app-route] (ecmascript)"), exports);
}),
"[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__addDisposableResource",
    ()=>__addDisposableResource,
    "__assign",
    ()=>__assign,
    "__asyncDelegator",
    ()=>__asyncDelegator,
    "__asyncGenerator",
    ()=>__asyncGenerator,
    "__asyncValues",
    ()=>__asyncValues,
    "__await",
    ()=>__await,
    "__awaiter",
    ()=>__awaiter,
    "__classPrivateFieldGet",
    ()=>__classPrivateFieldGet,
    "__classPrivateFieldIn",
    ()=>__classPrivateFieldIn,
    "__classPrivateFieldSet",
    ()=>__classPrivateFieldSet,
    "__createBinding",
    ()=>__createBinding,
    "__decorate",
    ()=>__decorate,
    "__disposeResources",
    ()=>__disposeResources,
    "__esDecorate",
    ()=>__esDecorate,
    "__exportStar",
    ()=>__exportStar,
    "__extends",
    ()=>__extends,
    "__generator",
    ()=>__generator,
    "__importDefault",
    ()=>__importDefault,
    "__importStar",
    ()=>__importStar,
    "__makeTemplateObject",
    ()=>__makeTemplateObject,
    "__metadata",
    ()=>__metadata,
    "__param",
    ()=>__param,
    "__propKey",
    ()=>__propKey,
    "__read",
    ()=>__read,
    "__rest",
    ()=>__rest,
    "__rewriteRelativeImportExtension",
    ()=>__rewriteRelativeImportExtension,
    "__runInitializers",
    ()=>__runInitializers,
    "__setFunctionName",
    ()=>__setFunctionName,
    "__spread",
    ()=>__spread,
    "__spreadArray",
    ()=>__spreadArray,
    "__spreadArrays",
    ()=>__spreadArrays,
    "__values",
    ()=>__values,
    "default",
    ()=>__TURBOPACK__default__export__
]);
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol, Iterator */ var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
        if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
        return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for(var i = decorators.length - 1; i >= 0; i--){
        var context = {};
        for(var p in contextIn)context[p] = p === "access" ? {} : contextIn[p];
        for(var p in contextIn.access)context.access[p] = contextIn.access[p];
        context.addInitializer = function(f) {
            if (done) throw new TypeError("Cannot add initializers after decoration has completed");
            extraInitializers.push(accept(f || null));
        };
        var result = (0, decorators[i])(kind === "accessor" ? {
            get: descriptor.get,
            set: descriptor.set
        } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        } else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
;
function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for(var i = 0; i < initializers.length; i++){
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
}
;
function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
}
;
function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", {
        configurable: true,
        value: prefix ? "".concat(prefix, " ", name) : name
    });
}
;
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var __createBinding = Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
};
function __exportStar(m, o) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function awaitReturn(f) {
        return function(v) {
            return Promise.resolve(v).then(f, reject);
        };
    }
    function verb(n, f) {
        if (g[n]) {
            i[n] = function(v) {
                return new Promise(function(a, b) {
                    q.push([
                        n,
                        v,
                        a,
                        b
                    ]) > 1 || resume(n, v);
                });
            };
            if (f) i[n] = f(i[n]);
        }
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: false
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    //TURBOPACK unreachable
    ;
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
            value: raw
        });
    } else {
        cooked.raw = raw;
    }
    return cooked;
}
;
var __setModuleDefault = Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
};
var ownKeys = function(o) {
    ownKeys = Object.getOwnPropertyNames || function(o) {
        var ar = [];
        for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
        return ar;
    };
    return ownKeys(o);
};
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
    }
    __setModuleDefault(result, mod);
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() {
            try {
                inner.call(this);
            } catch (e) {
                return Promise.reject(e);
            }
        };
        env.stack.push({
            value: value,
            dispose: dispose,
            async: async
        });
    } else if (async) {
        env.stack.push({
            async: true
        });
    }
    return value;
}
var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function __disposeResources(env) {
    function fail(e) {
        env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    var r, s = 0;
    function next() {
        while(r = env.stack.pop()){
            try {
                if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                if (r.dispose) {
                    var result = r.dispose.call(r.value);
                    if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
                        fail(e);
                        return next();
                    });
                } else s |= 1;
            } catch (e) {
                fail(e);
            }
        }
        if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
        if (env.hasError) throw env.error;
    }
    return next();
}
function __rewriteRelativeImportExtension(path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
        });
    }
    return path;
}
const __TURBOPACK__default__export__ = {
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __esDecorate,
    __runInitializers,
    __propKey,
    __setFunctionName,
    __metadata,
    __awaiter,
    __generator,
    __createBinding,
    __exportStar,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __spreadArray,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet,
    __classPrivateFieldIn,
    __addDisposableResource,
    __disposeResources,
    __rewriteRelativeImportExtension
};
}),
"[project]/node_modules/@protobufjs/aspromise/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = asPromise;
/**
 * Callback as used by {@link util.asPromise}.
 * @typedef asPromiseCallback
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {...*} params Additional arguments
 * @returns {undefined}
 */ /**
 * Returns a promise from a node-style callback function.
 * @memberof util
 * @param {asPromiseCallback} fn Function to call
 * @param {*} ctx Function context
 * @param {...*} params Function arguments
 * @returns {Promise<*>} Promisified function
 */ function asPromise(fn, ctx /*, varargs */ ) {
    var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
    while(index < arguments.length)params[offset++] = arguments[index++];
    return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err /*, varargs */ ) {
            if (pending) {
                pending = false;
                if (err) reject(err);
                else {
                    var params = new Array(arguments.length - 1), offset = 0;
                    while(offset < params.length)params[offset++] = arguments[offset];
                    resolve.apply(null, params);
                }
            }
        };
        try {
            fn.apply(ctx || null, params);
        } catch (err) {
            if (pending) {
                pending = false;
                reject(err);
            }
        }
    });
}
}),
"[project]/node_modules/@protobufjs/base64/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * A minimal base64 implementation for number arrays.
 * @memberof util
 * @namespace
 */ var base64 = exports;
/**
 * Calculates the byte length of a base64 encoded string.
 * @param {string} string Base64 encoded string
 * @returns {number} Byte length
 */ base64.length = function length(string) {
    var p = string.length;
    if (!p) return 0;
    var n = 0;
    while(--p % 4 > 1 && string.charAt(p) === "=")++n;
    return Math.ceil(string.length * 3) / 4 - n;
};
// Base64 encoding table
var b64 = new Array(64);
// Base64 decoding table
var s64 = new Array(123);
// 65..90, 97..122, 48..57, 43, 47
for(var i = 0; i < 64;)s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
/**
 * Encodes a buffer to a base64 encoded string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} Base64 encoded string
 */ base64.encode = function encode(buffer, start, end) {
    var parts = null, chunk = [];
    var i = 0, j = 0, t; // temporary
    while(start < end){
        var b = buffer[start++];
        switch(j){
            case 0:
                chunk[i++] = b64[b >> 2];
                t = (b & 3) << 4;
                j = 1;
                break;
            case 1:
                chunk[i++] = b64[t | b >> 4];
                t = (b & 15) << 2;
                j = 2;
                break;
            case 2:
                chunk[i++] = b64[t | b >> 6];
                chunk[i++] = b64[b & 63];
                j = 0;
                break;
        }
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (j) {
        chunk[i++] = b64[t];
        chunk[i++] = 61;
        if (j === 1) chunk[i++] = 61;
    }
    if (parts) {
        if (i) parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};
var invalidEncoding = "invalid encoding";
/**
 * Decodes a base64 encoded string to a buffer.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Number of bytes written
 * @throws {Error} If encoding is invalid
 */ base64.decode = function decode(string, buffer, offset) {
    var start = offset;
    var j = 0, t; // temporary
    for(var i = 0; i < string.length;){
        var c = string.charCodeAt(i++);
        if (c === 61 && j > 1) break;
        if ((c = s64[c]) === undefined) throw Error(invalidEncoding);
        switch(j){
            case 0:
                t = c;
                j = 1;
                break;
            case 1:
                buffer[offset++] = t << 2 | (c & 48) >> 4;
                t = c;
                j = 2;
                break;
            case 2:
                buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
                t = c;
                j = 3;
                break;
            case 3:
                buffer[offset++] = (t & 3) << 6 | c;
                j = 0;
                break;
        }
    }
    if (j === 1) throw Error(invalidEncoding);
    return offset - start;
};
/**
 * Tests if the specified string appears to be base64 encoded.
 * @param {string} string String to test
 * @returns {boolean} `true` if probably base64 encoded, otherwise false
 */ base64.test = function test(string) {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
};
}),
"[project]/node_modules/@protobufjs/eventemitter/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = EventEmitter;
/**
 * Constructs a new event emitter instance.
 * @classdesc A minimal event emitter.
 * @memberof util
 * @constructor
 */ function EventEmitter() {
    /**
     * Registered listeners.
     * @type {Object.<string,*>}
     * @private
     */ this._listeners = {};
}
/**
 * Registers an event listener.
 * @param {string} evt Event name
 * @param {function} fn Listener
 * @param {*} [ctx] Listener context
 * @returns {util.EventEmitter} `this`
 */ EventEmitter.prototype.on = function on(evt, fn, ctx) {
    (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn: fn,
        ctx: ctx || this
    });
    return this;
};
/**
 * Removes an event listener or any matching listeners if arguments are omitted.
 * @param {string} [evt] Event name. Removes all listeners if omitted.
 * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
 * @returns {util.EventEmitter} `this`
 */ EventEmitter.prototype.off = function off(evt, fn) {
    if (evt === undefined) this._listeners = {};
    else {
        if (fn === undefined) this._listeners[evt] = [];
        else {
            var listeners = this._listeners[evt];
            for(var i = 0; i < listeners.length;)if (listeners[i].fn === fn) listeners.splice(i, 1);
            else ++i;
        }
    }
    return this;
};
/**
 * Emits an event by calling its listeners with the specified arguments.
 * @param {string} evt Event name
 * @param {...*} args Arguments
 * @returns {util.EventEmitter} `this`
 */ EventEmitter.prototype.emit = function emit(evt) {
    var listeners = this._listeners[evt];
    if (listeners) {
        var args = [], i = 1;
        for(; i < arguments.length;)args.push(arguments[i++]);
        for(i = 0; i < listeners.length;)listeners[i].fn.apply(listeners[i++].ctx, args);
    }
    return this;
};
}),
"[project]/node_modules/@protobufjs/float/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = factory(factory);
/**
 * Reads / writes floats / doubles from / to buffers.
 * @name util.float
 * @namespace
 */ /**
 * Writes a 32 bit float to a buffer using little endian byte order.
 * @name util.float.writeFloatLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */ /**
 * Writes a 32 bit float to a buffer using big endian byte order.
 * @name util.float.writeFloatBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */ /**
 * Reads a 32 bit float from a buffer using little endian byte order.
 * @name util.float.readFloatLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */ /**
 * Reads a 32 bit float from a buffer using big endian byte order.
 * @name util.float.readFloatBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */ /**
 * Writes a 64 bit double to a buffer using little endian byte order.
 * @name util.float.writeDoubleLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */ /**
 * Writes a 64 bit double to a buffer using big endian byte order.
 * @name util.float.writeDoubleBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */ /**
 * Reads a 64 bit double from a buffer using little endian byte order.
 * @name util.float.readDoubleLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */ /**
 * Reads a 64 bit double from a buffer using big endian byte order.
 * @name util.float.readDoubleBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */ // Factory function for the purpose of node-based testing in modified global environments
function factory(exports) {
    // float: typed array
    if (typeof Float32Array !== "undefined") (function() {
        var f32 = new Float32Array([
            -0
        ]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
        function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
        }
        function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
        }
        /* istanbul ignore next */ exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
        /* istanbul ignore next */ exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
        function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
        }
        function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
        }
        /* istanbul ignore next */ exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
        /* istanbul ignore next */ exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
    // float: ieee754
    })();
    else (function() {
        function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign) val = -val;
            if (val === 0) writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos);
            else if (isNaN(val)) writeUint(2143289344, buf, pos);
            else if (val > 3.4028234663852886e+38) writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 1.1754943508222875e-38) writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);
            else {
                var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
        }
        exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
        exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
        function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 // denormal
             ? sign * 1.401298464324817e-45 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
        }
        exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
        exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
    })();
    // double: typed array
    if (typeof Float64Array !== "undefined") (function() {
        var f64 = new Float64Array([
            -0
        ]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
        function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
        }
        function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
        }
        /* istanbul ignore next */ exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
        /* istanbul ignore next */ exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
        function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
        }
        function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
        }
        /* istanbul ignore next */ exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
        /* istanbul ignore next */ exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
    // double: ieee754
    })();
    else (function() {
        function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign) val = -val;
            if (val === 0) {
                writeUint(0, buf, pos + off0);
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
                writeUint(0, buf, pos + off0);
                writeUint(2146959360, buf, pos + off1);
            } else if (val > 1.7976931348623157e+308) {
                writeUint(0, buf, pos + off0);
                writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
                var mantissa;
                if (val < 2.2250738585072014e-308) {
                    mantissa = val / 5e-324;
                    writeUint(mantissa >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                } else {
                    var exponent = Math.floor(Math.log(val) / Math.LN2);
                    if (exponent === 1024) exponent = 1023;
                    mantissa = val * Math.pow(2, -exponent);
                    writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                }
            }
        }
        exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
        exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
        function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 // denormal
             ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
        }
        exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
        exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
    })();
    return exports;
}
// uint helpers
function writeUintLE(val, buf, pos) {
    buf[pos] = val & 255;
    buf[pos + 1] = val >>> 8 & 255;
    buf[pos + 2] = val >>> 16 & 255;
    buf[pos + 3] = val >>> 24;
}
function writeUintBE(val, buf, pos) {
    buf[pos] = val >>> 24;
    buf[pos + 1] = val >>> 16 & 255;
    buf[pos + 2] = val >>> 8 & 255;
    buf[pos + 3] = val & 255;
}
function readUintLE(buf, pos) {
    return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
}
function readUintBE(buf, pos) {
    return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
}
}),
"[project]/node_modules/@protobufjs/inquire/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = inquire;
/**
 * Requires a module only if available.
 * @memberof util
 * @param {string} moduleName Module to require
 * @returns {?Object} Required module if available and not empty, otherwise `null`
 */ function inquire(moduleName) {
    try {
        var mod = eval("quire".replace(/^/, "re"))(moduleName); // eslint-disable-line no-eval
        if (mod && (mod.length || Object.keys(mod).length)) return mod;
    } catch (e) {} // eslint-disable-line no-empty
    return null;
}
}),
"[project]/node_modules/@protobufjs/utf8/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * A minimal UTF8 implementation for number arrays.
 * @memberof util
 * @namespace
 */ var utf8 = exports;
/**
 * Calculates the UTF8 byte length of a string.
 * @param {string} string String
 * @returns {number} Byte length
 */ utf8.length = function utf8_length(string) {
    var len = 0, c = 0;
    for(var i = 0; i < string.length; ++i){
        c = string.charCodeAt(i);
        if (c < 128) len += 1;
        else if (c < 2048) len += 2;
        else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
        } else len += 3;
    }
    return len;
};
/**
 * Reads UTF8 bytes as a string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} String read
 */ utf8.read = function utf8_read(buffer, start, end) {
    var len = end - start;
    if (len < 1) return "";
    var parts = null, chunk = [], i = 0, t; // temporary
    while(start < end){
        t = buffer[start++];
        if (t < 128) chunk[i++] = t;
        else if (t > 191 && t < 224) chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
            chunk[i++] = 0xD800 + (t >> 10);
            chunk[i++] = 0xDC00 + (t & 1023);
        } else chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (parts) {
        if (i) parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};
/**
 * Writes a string as UTF8 bytes.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Bytes written
 */ utf8.write = function utf8_write(string, buffer, offset) {
    var start = offset, c1, c2; // character 2
    for(var i = 0; i < string.length; ++i){
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
            buffer[offset++] = c1;
        } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6 | 192;
            buffer[offset++] = c1 & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buffer[offset++] = c1 >> 18 | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
        } else {
            buffer[offset++] = c1 >> 12 | 224;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
        }
    }
    return offset - start;
};
}),
"[project]/node_modules/@protobufjs/pool/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = pool;
/**
 * An allocator as used by {@link util.pool}.
 * @typedef PoolAllocator
 * @type {function}
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */ /**
 * A slicer as used by {@link util.pool}.
 * @typedef PoolSlicer
 * @type {function}
 * @param {number} start Start offset
 * @param {number} end End offset
 * @returns {Uint8Array} Buffer slice
 * @this {Uint8Array}
 */ /**
 * A general purpose buffer pool.
 * @memberof util
 * @function
 * @param {PoolAllocator} alloc Allocator
 * @param {PoolSlicer} slice Slicer
 * @param {number} [size=8192] Slab size
 * @returns {PoolAllocator} Pooled allocator
 */ function pool(alloc, slice, size) {
    var SIZE = size || 8192;
    var MAX = SIZE >>> 1;
    var slab = null;
    var offset = SIZE;
    return function pool_alloc(size) {
        if (size < 1 || size > MAX) return alloc(size);
        if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size);
        if (offset & 7) offset = (offset | 7) + 1;
        return buf;
    };
}
}),
"[project]/node_modules/@apollo/protobufjs/src/util/longbits.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = LongBits;
var util = __turbopack_context__.r("[project]/node_modules/@apollo/protobufjs/src/util/minimal.js [app-route] (ecmascript)");
/**
 * Constructs new long bits.
 * @classdesc Helper class for working with the low and high bits of a 64 bit value.
 * @memberof util
 * @constructor
 * @param {number} lo Low 32 bits, unsigned
 * @param {number} hi High 32 bits, unsigned
 */ function LongBits(lo, hi) {
    // note that the casts below are theoretically unnecessary as of today, but older statically
    // generated converter code might still call the ctor with signed 32bits. kept for compat.
    /**
     * Low bits.
     * @type {number}
     */ this.lo = lo >>> 0;
    /**
     * High bits.
     * @type {number}
     */ this.hi = hi >>> 0;
}
/**
 * Zero bits.
 * @memberof util.LongBits
 * @type {util.LongBits}
 */ var zero = LongBits.zero = new LongBits(0, 0);
zero.toNumber = function() {
    return 0;
};
zero.zzEncode = zero.zzDecode = function() {
    return this;
};
zero.length = function() {
    return 1;
};
/**
 * Zero hash.
 * @memberof util.LongBits
 * @type {string}
 */ var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
/**
 * Constructs new long bits from the specified number.
 * @param {number} value Value
 * @returns {util.LongBits} Instance
 */ LongBits.fromNumber = function fromNumber(value) {
    if (value === 0) return zero;
    var sign = value < 0;
    if (sign) value = -value;
    var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295) hi = 0;
        }
    }
    return new LongBits(lo, hi);
};
/**
 * Constructs new long bits from a number, long or string.
 * @param {number|string} value Value
 * @returns {util.LongBits} Instance
 */ LongBits.from = function from(value) {
    if (typeof value === "number") return LongBits.fromNumber(value);
    if (util.isString(value)) {
        /* istanbul ignore else */ if (util.Long) value = util.Long.fromString(value);
        else return LongBits.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
};
/**
 * Converts this long bits to a possibly unsafe JavaScript number.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {number} Possibly unsafe number
 */ LongBits.prototype.toNumber = function toNumber(unsigned) {
    if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
        if (!lo) hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
};
/*
 * Converts this long bits to a long.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long} Long
 */ LongBits.prototype.toLong = function toLong(unsigned) {
    return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : {
        low: this.lo | 0,
        high: this.hi | 0,
        unsigned: Boolean(unsigned)
    };
};
var charCodeAt = String.prototype.charCodeAt;
/**
 * Constructs new long bits from the specified 8 characters long hash.
 * @param {string} hash Hash
 * @returns {util.LongBits} Bits
 */ LongBits.fromHash = function fromHash(hash) {
    if (hash === zeroHash) return zero;
    return new LongBits((charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0, (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0);
};
/**
 * Converts this long bits to a 8 characters long hash.
 * @returns {string} Hash
 */ LongBits.prototype.toHash = function toHash() {
    return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
};
/**
 * Zig-zag encodes this long bits.
 * @returns {util.LongBits} `this`
 */ LongBits.prototype.zzEncode = function zzEncode() {
    var mask = this.hi >> 31;
    this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo = (this.lo << 1 ^ mask) >>> 0;
    return this;
};
/**
 * Zig-zag decodes this long bits.
 * @returns {util.LongBits} `this`
 */ LongBits.prototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi = (this.hi >>> 1 ^ mask) >>> 0;
    return this;
};
/**
 * Calculates the length of this longbits when encoded as a varint.
 * @returns {number} Length
 */ LongBits.prototype.length = function length() {
    var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
    return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
};
}),
"[project]/node_modules/@apollo/protobufjs/src/util/minimal.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var util = exports;
// used to return a Promise where callback is omitted
util.asPromise = __turbopack_context__.r("[project]/node_modules/@protobufjs/aspromise/index.js [app-route] (ecmascript)");
// converts to / from base64 encoded strings
util.base64 = __turbopack_context__.r("[project]/node_modules/@protobufjs/base64/index.js [app-route] (ecmascript)");
// base class of rpc.Service
util.EventEmitter = __turbopack_context__.r("[project]/node_modules/@protobufjs/eventemitter/index.js [app-route] (ecmascript)");
// float handling accross browsers
util.float = __turbopack_context__.r("[project]/node_modules/@protobufjs/float/index.js [app-route] (ecmascript)");
// requires modules optionally and hides the call from bundlers
util.inquire = __turbopack_context__.r("[project]/node_modules/@protobufjs/inquire/index.js [app-route] (ecmascript)");
// converts to / from utf8 encoded strings
util.utf8 = __turbopack_context__.r("[project]/node_modules/@protobufjs/utf8/index.js [app-route] (ecmascript)");
// provides a node-like buffer pool in the browser
util.pool = __turbopack_context__.r("[project]/node_modules/@protobufjs/pool/index.js [app-route] (ecmascript)");
// utility to work with the low and high bits of a 64 bit value
util.LongBits = __turbopack_context__.r("[project]/node_modules/@apollo/protobufjs/src/util/longbits.js [app-route] (ecmascript)");
// global object reference
util.global = ("TURBOPACK compile-time value", "undefined") !== "undefined" && window || ("TURBOPACK compile-time value", "object") !== "undefined" && /*TURBOPACK member replacement*/ __turbopack_context__.g || typeof self !== "undefined" && self || /*TURBOPACK member replacement*/ __turbopack_context__.e; // eslint-disable-line no-invalid-this
/**
 * An immuable empty array.
 * @memberof util
 * @type {Array.<*>}
 * @const
 */ util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */ []; // used on prototypes
/**
 * An immutable empty object.
 * @type {Object}
 * @const
 */ util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */ {}; // used on prototypes
/**
 * Whether running within node or not.
 * @memberof util
 * @type {boolean}
 * @const
 */ util.isNode = Boolean(util.global.process && util.global.process.versions && util.global.process.versions.node);
/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */ util.isInteger = Number.isInteger || /* istanbul ignore next */ function isInteger(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};
/**
 * Tests if the specified value is a string.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a string
 */ util.isString = function isString(value) {
    return typeof value === "string" || value instanceof String;
};
/**
 * Tests if the specified value is a non-null object.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a non-null object
 */ util.isObject = function isObject(value) {
    return value && typeof value === "object";
};
/**
 * Checks if a property on a message is considered to be present.
 * This is an alias of {@link util.isSet}.
 * @function
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */ util.isset = /**
 * Checks if a property on a message is considered to be present.
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */ util.isSet = function isSet(obj, prop) {
    var value = obj[prop];
    if (value != null && obj.hasOwnProperty(prop)) return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
    return false;
};
/**
 * Any compatible Buffer instance.
 * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
 * @interface Buffer
 * @extends Uint8Array
 */ /**
 * Node's Buffer class if available.
 * @type {Constructor<Buffer>}
 */ util.Buffer = function() {
    try {
        var Buffer = util.inquire("buffer").Buffer;
        // refuse to use non-node buffers if not explicitly assigned (perf reasons):
        return Buffer.prototype.utf8Write ? Buffer : /* istanbul ignore next */ null;
    } catch (e) {
        /* istanbul ignore next */ return null;
    }
}();
// Internal alias of or polyfull for Buffer.from.
util._Buffer_from = null;
// Internal alias of or polyfill for Buffer.allocUnsafe.
util._Buffer_allocUnsafe = null;
/**
 * Creates a new buffer of whatever type supported by the environment.
 * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
 * @returns {Uint8Array|Buffer} Buffer
 */ util.newBuffer = function newBuffer(sizeOrArray) {
    /* istanbul ignore next */ return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
};
/**
 * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
 * @type {Constructor<Uint8Array>}
 */ util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */  : Array;
/*
 * Long.js's Long class if available and $ENABLE_LONG is set. This lets us leave it on
 * for this package's tests but have it be off in actual usage-reporting-protobuf use.
 * (We leave it on for some mode where there is no `process` that is used by tests.)
 */ util.Long = typeof process === 'undefined' || process.env.ENABLE_LONG ? /* istanbul ignore next */ util.global.dcodeIO && /* istanbul ignore next */ util.global.dcodeIO.Long || /* istanbul ignore next */ util.global.Long || util.inquire("long") : undefined;
/**
 * Regular expression used to verify 2 bit (`bool`) map keys.
 * @type {RegExp}
 * @const
 */ util.key2Re = /^true|false|0|1$/;
/**
 * Regular expression used to verify 32 bit (`int32` etc.) map keys.
 * @type {RegExp}
 * @const
 */ util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
/**
 * Regular expression used to verify 64 bit (`int64` etc.) map keys.
 * @type {RegExp}
 * @const
 */ util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
/*
 * Converts a number or long to an 8 characters long hash string.
 * @param {Long|number} value Value to convert
 * @returns {string} Hash
 */ util.longToHash = function longToHash(value) {
    return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
};
/*
 * Converts an 8 characters long hash string to a long or number.
 * @param {string} hash Hash
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long|number} Original value
 */ util.longFromHash = function longFromHash(hash, unsigned) {
    var bits = util.LongBits.fromHash(hash);
    if (util.Long) return util.Long.fromBits(bits.lo, bits.hi, unsigned);
    return bits.toNumber(Boolean(unsigned));
};
/**
 * Merges the properties of the source object into the destination object.
 * @memberof util
 * @param {Object.<string,*>} dst Destination object
 * @param {Object.<string,*>} src Source object
 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
 * @returns {Object.<string,*>} Destination object
 */ function merge(dst, src, ifNotSet) {
    for(var keys = Object.keys(src), i = 0; i < keys.length; ++i)if (dst[keys[i]] === undefined || !ifNotSet) dst[keys[i]] = src[keys[i]];
    return dst;
}
util.merge = merge;
/**
 * Converts the first character of a string to lower case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */ util.lcFirst = function lcFirst(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
};
/**
 * Creates a custom error constructor.
 * @memberof util
 * @param {string} name Error name
 * @returns {Constructor<Error>} Custom error constructor
 */ function newError(name) {
    function CustomError(message, properties) {
        if (!(this instanceof CustomError)) return new CustomError(message, properties);
        // Error.call(this, message);
        // ^ just returns a new error instance because the ctor can be called as a function
        Object.defineProperty(this, "message", {
            get: function() {
                return message;
            }
        });
        /* istanbul ignore next */ if (Error.captureStackTrace) Error.captureStackTrace(this, CustomError);
        else Object.defineProperty(this, "stack", {
            value: new Error().stack || ""
        });
        if (properties) merge(this, properties);
    }
    (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;
    Object.defineProperty(CustomError.prototype, "name", {
        get: function() {
            return name;
        }
    });
    CustomError.prototype.toString = function toString() {
        return this.name + ": " + this.message;
    };
    return CustomError;
}
util.newError = newError;
/**
 * Constructs a new protocol error.
 * @classdesc Error subclass indicating a protocol specifc error.
 * @memberof util
 * @extends Error
 * @template T extends Message<T>
 * @constructor
 * @param {string} message Error message
 * @param {Object.<string,*>} [properties] Additional properties
 * @example
 * try {
 *     MyMessage.decode(someBuffer); // throws if required fields are missing
 * } catch (e) {
 *     if (e instanceof ProtocolError && e.instance)
 *         console.log("decoded so far: " + JSON.stringify(e.instance));
 * }
 */ util.ProtocolError = newError("ProtocolError");
/**
 * So far decoded message instance.
 * @name util.ProtocolError#instance
 * @type {Message<T>}
 */ /**
 * A OneOf getter as returned by {@link util.oneOfGetter}.
 * @typedef OneOfGetter
 * @type {function}
 * @returns {string|undefined} Set field name, if any
 */ /**
 * Builds a getter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfGetter} Unbound getter
 */ util.oneOfGetter = function getOneOf(fieldNames) {
    var fieldMap = {};
    for(var i = 0; i < fieldNames.length; ++i)fieldMap[fieldNames[i]] = 1;
    /**
     * @returns {string|undefined} Set field name, if any
     * @this Object
     * @ignore
     */ return function() {
        for(var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null) return keys[i];
    };
};
/**
 * A OneOf setter as returned by {@link util.oneOfSetter}.
 * @typedef OneOfSetter
 * @type {function}
 * @param {string|undefined} value Field name
 * @returns {undefined}
 */ /**
 * Builds a setter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfSetter} Unbound setter
 */ util.oneOfSetter = function setOneOf(fieldNames) {
    /**
     * @param {string} name Field name
     * @returns {undefined}
     * @this Object
     * @ignore
     */ return function(name) {
        for(var i = 0; i < fieldNames.length; ++i)if (fieldNames[i] !== name) delete this[fieldNames[i]];
    };
};
/**
 * Default conversion options used for {@link Message#toJSON} implementations.
 *
 * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
 *
 * - Longs become strings
 * - Enums become string keys
 * - Bytes become base64 encoded strings
 * - (Sub-)Messages become plain objects
 * - Maps become plain objects with all string keys
 * - Repeated fields become arrays
 * - NaN and Infinity for float and double fields become strings
 *
 * @type {IConversionOptions}
 * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
 */ util.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String,
    json: true
};
// Sets up buffer utility according to the environment (called in index-minimal)
util._configure = function() {
    var Buffer = util.Buffer;
    /* istanbul ignore if */ if (!Buffer) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
    }
    // because node 4.x buffers are incompatible & immutable
    // see: https://github.com/dcodeIO/protobuf.js/pull/665
    util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from || /* istanbul ignore next */ function Buffer_from(value, encoding) {
        return new Buffer(value, encoding);
    };
    util._Buffer_allocUnsafe = Buffer.allocUnsafe || /* istanbul ignore next */ function Buffer_allocUnsafe(size) {
        return new Buffer(size);
    };
};
}),
"[project]/node_modules/@apollo/protobufjs/src/writer.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = Writer;
var util = __turbopack_context__.r("[project]/node_modules/@apollo/protobufjs/src/util/minimal.js [app-route] (ecmascript)");
var BufferWriter; // cyclic
var LongBits = util.LongBits, base64 = util.base64, utf8 = util.utf8;
/**
 * Constructs a new writer operation instance.
 * @classdesc Scheduled writer operation.
 * @constructor
 * @param {function(*, Uint8Array, number)} fn Function to call
 * @param {number} len Value byte length
 * @param {*} val Value to write
 * @ignore
 */ function Op(fn, len, val) {
    /**
     * Function to call.
     * @type {function(Uint8Array, number, *)}
     */ this.fn = fn;
    /**
     * Value byte length.
     * @type {number}
     */ this.len = len;
    /**
     * Next operation.
     * @type {Writer.Op|undefined}
     */ this.next = undefined;
    /**
     * Value to write.
     * @type {*}
     */ this.val = val; // type varies
}
/* istanbul ignore next */ function noop() {} // eslint-disable-line no-empty-function
/**
 * Constructs a new writer state instance.
 * @classdesc Copied writer state.
 * @memberof Writer
 * @constructor
 * @param {Writer} writer Writer to copy state from
 * @ignore
 */ function State(writer) {
    /**
     * Current head.
     * @type {Writer.Op}
     */ this.head = writer.head;
    /**
     * Current tail.
     * @type {Writer.Op}
     */ this.tail = writer.tail;
    /**
     * Current buffer length.
     * @type {number}
     */ this.len = writer.len;
    /**
     * Next state.
     * @type {State|null}
     */ this.next = writer.states;
}
/**
 * Constructs a new writer instance.
 * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 */ function Writer() {
    /**
     * Current length.
     * @type {number}
     */ this.len = 0;
    /**
     * Operations head.
     * @type {Object}
     */ this.head = new Op(noop, 0, 0);
    /**
     * Operations tail
     * @type {Object}
     */ this.tail = this.head;
    /**
     * Linked forked states.
     * @type {Object|null}
     */ this.states = null;
// When a value is written, the writer calculates its byte length and puts it into a linked
// list of operations to perform when finish() is called. This both allows us to allocate
// buffers of the exact required size and reduces the amount of work we have to do compared
// to first calculating over objects and then encoding over objects. In our case, the encoding
// part is just a linked list walk calling operations with already prepared values.
}
/**
 * Creates a new writer.
 * @function
 * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
 */ Writer.create = util.Buffer ? function create_buffer_setup() {
    return (Writer.create = function create_buffer() {
        return new BufferWriter();
    })();
} : function create_array() {
    return new Writer();
};
/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */ Writer.alloc = function alloc(size) {
    return new util.Array(size);
};
// Use Uint8Array buffer pool in the browser, just like node does with buffers
/* istanbul ignore else */ if (util.Array !== Array) Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
/**
 * Pushes a new operation to the queue.
 * @param {function(Uint8Array, number, *)} fn Function to call
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @returns {Writer} `this`
 * @private
 */ Writer.prototype._push = function push(fn, len, val) {
    this.tail = this.tail.next = new Op(fn, len, val);
    this.len += len;
    return this;
};
function writeByte(val, buf, pos) {
    buf[pos] = val & 255;
}
function writeVarint32(val, buf, pos) {
    while(val > 127){
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
    }
    buf[pos] = val;
}
/**
 * Constructs a new varint writer operation instance.
 * @classdesc Scheduled varint writer operation.
 * @extends Op
 * @constructor
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @ignore
 */ function VarintOp(len, val) {
    this.len = len;
    this.next = undefined;
    this.val = val;
}
VarintOp.prototype = Object.create(Op.prototype);
VarintOp.prototype.fn = writeVarint32;
/**
 * Writes an unsigned 32 bit value as a varint.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */ Writer.prototype.uint32 = function write_uint32(value) {
    // here, the call to this.push has been inlined and a varint specific Op subclass is used.
    // uint32 is by far the most frequently used operation and benefits significantly from this.
    this.len += (this.tail = this.tail.next = new VarintOp((value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5, value)).len;
    return this;
};
/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */ Writer.prototype.int32 = function write_int32(value) {
    return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
     : this.uint32(value);
};
/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */ Writer.prototype.sint32 = function write_sint32(value) {
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
};
function writeVarint64(val, buf, pos) {
    while(val.hi){
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
    }
    while(val.lo > 127){
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
    }
    buf[pos++] = val.lo;
}
/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */ Writer.prototype.uint64 = function write_uint64(value) {
    var bits = LongBits.from(value);
    return this._push(writeVarint64, bits.length(), bits);
};
/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */ Writer.prototype.int64 = Writer.prototype.uint64;
/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */ Writer.prototype.sint64 = function write_sint64(value) {
    var bits = LongBits.from(value).zzEncode();
    return this._push(writeVarint64, bits.length(), bits);
};
/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {Writer} `this`
 */ Writer.prototype.bool = function write_bool(value) {
    return this._push(writeByte, 1, value ? 1 : 0);
};
function writeFixed32(val, buf, pos) {
    buf[pos] = val & 255;
    buf[pos + 1] = val >>> 8 & 255;
    buf[pos + 2] = val >>> 16 & 255;
    buf[pos + 3] = val >>> 24;
}
/**
 * Writes an unsigned 32 bit value as fixed 32 bits.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */ Writer.prototype.fixed32 = function write_fixed32(value) {
    return this._push(writeFixed32, 4, value >>> 0);
};
/**
 * Writes a signed 32 bit value as fixed 32 bits.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */ Writer.prototype.sfixed32 = Writer.prototype.fixed32;
/**
 * Writes an unsigned 64 bit value as fixed 64 bits.
 * @param {number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */ Writer.prototype.fixed64 = function write_fixed64(value) {
    var bits = LongBits.from(value);
    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
};
/**
 * Writes a signed 64 bit value as fixed 64 bits.
 * @function
 * @param {number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */ Writer.prototype.sfixed64 = Writer.prototype.fixed64;
/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */ Writer.prototype.float = function write_float(value) {
    return this._push(util.float.writeFloatLE, 4, value);
};
/**
 * Writes a double (64 bit float).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */ Writer.prototype.double = function write_double(value) {
    return this._push(util.float.writeDoubleLE, 8, value);
};
var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
    buf.set(val, pos); // also works for plain array values
} : function writeBytes_for(val, buf, pos) {
    for(var i = 0; i < val.length; ++i)buf[pos + i] = val[i];
};
/**
 * Writes a sequence of bytes.
 * @param {Uint8Array|string} value Buffer or base64 encoded string to write
 * @returns {Writer} `this`
 */ Writer.prototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    if (!len) return this._push(writeByte, 1, 0);
    if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
    }
    return this.uint32(len)._push(writeBytes, len, value);
};
/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */ Writer.prototype.string = function write_string(value) {
    var len = utf8.length(value);
    return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
};
/**
 * Forks this writer's state by pushing it to a stack.
 * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
 * @returns {Writer} `this`
 */ Writer.prototype.fork = function fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
};
/**
 * Resets this instance to the last state.
 * @returns {Writer} `this`
 */ Writer.prototype.reset = function reset() {
    if (this.states) {
        this.head = this.states.head;
        this.tail = this.states.tail;
        this.len = this.states.len;
        this.states = this.states.next;
    } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
    }
    return this;
};
/**
 * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
 * @returns {Writer} `this`
 */ Writer.prototype.ldelim = function ldelim() {
    var head = this.head, tail = this.tail, len = this.len;
    this.reset().uint32(len);
    if (len) {
        this.tail.next = head.next; // skip noop
        this.tail = tail;
        this.len += len;
    }
    return this;
};
/**
 * Finishes the write operation.
 * @returns {Uint8Array} Finished buffer
 */ Writer.prototype.finish = function finish() {
    var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
    while(head){
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
    }
    // this.head = this.tail = null;
    return buf;
};
Writer._configure = function(BufferWriter_) {
    BufferWriter = BufferWriter_;
};
}),
"[project]/node_modules/@apollo/protobufjs/src/writer_buffer.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = BufferWriter;
// extends Writer
var Writer = __turbopack_context__.r("[project]/node_modules/@apollo/protobufjs/src/writer.js [app-route] (ecmascript)");
(BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
var util = __turbopack_context__.r("[project]/node_modules/@apollo/protobufjs/src/util/minimal.js [app-route] (ecmascript)");
var Buffer = util.Buffer;
/**
 * Constructs a new buffer writer instance.
 * @classdesc Wire format writer using node buffers.
 * @extends Writer
 * @constructor
 */ function BufferWriter() {
    Writer.call(this);
}
/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Buffer} Buffer
 */ BufferWriter.alloc = function alloc_buffer(size) {
    return (BufferWriter.alloc = util._Buffer_allocUnsafe)(size);
};
var writeBytesBuffer = Buffer && Buffer.prototype instanceof Uint8Array && Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
    buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
// also works for plain array values
} : function writeBytesBuffer_copy(val, buf, pos) {
    if (val.copy) val.copy(buf, pos, 0, val.length);
    else for(var i = 0; i < val.length;)buf[pos++] = val[i++];
};
/**
 * @override
 */ BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
    if (util.isString(value)) value = util._Buffer_from(value, "base64");
    var len = value.length >>> 0;
    this.uint32(len);
    if (len) this._push(writeBytesBuffer, len, value);
    return this;
};
function writeStringBuffer(val, buf, pos) {
    if (val.length < 40) util.utf8.write(val, buf, pos);
    else buf.utf8Write(val, pos);
}
/**
 * @override
 */ BufferWriter.prototype.string = function write_string_buffer(value) {
    var len = Buffer.byteLength(value);
    this.uint32(len);
    if (len) this._push(writeStringBuffer, len, value);
    return this;
}; /**
 * Finishes the write operation.
 * @name BufferWriter#finish
 * @function
 * @returns {Buffer} Finished buffer
 */ 
}),
"[project]/node_modules/@apollo/protobufjs/src/reader.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = Reader;
var util = __turbopack_context__.r("[project]/node_modules/@apollo/protobufjs/src/util/minimal.js [app-route] (ecmascript)");
var BufferReader; // cyclic
var LongBits = util.LongBits, utf8 = util.utf8;
/* istanbul ignore next */ function indexOutOfRange(reader, writeLength) {
    return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
}
/**
 * Constructs a new reader instance using the specified buffer.
 * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 * @param {Uint8Array} buffer Buffer to read from
 */ function Reader(buffer) {
    /**
     * Read buffer.
     * @type {Uint8Array}
     */ this.buf = buffer;
    /**
     * Read buffer position.
     * @type {number}
     */ this.pos = 0;
    /**
     * Read buffer length.
     * @type {number}
     */ this.len = buffer.length;
}
var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
    if (buffer instanceof Uint8Array || Array.isArray(buffer)) return new Reader(buffer);
    throw Error("illegal buffer");
} : function create_array(buffer) {
    if (Array.isArray(buffer)) return new Reader(buffer);
    throw Error("illegal buffer");
};
/**
 * Creates a new reader using the specified buffer.
 * @function
 * @param {Uint8Array|Buffer} buffer Buffer to read from
 * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
 * @throws {Error} If `buffer` is not a valid buffer
 */ Reader.create = util.Buffer ? function create_buffer_setup(buffer) {
    return (Reader.create = function create_buffer(buffer) {
        return util.Buffer.isBuffer(buffer) ? new BufferReader(buffer) : create_array(buffer);
    })(buffer);
} : create_array;
Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */ util.Array.prototype.slice;
/**
 * Reads a varint as an unsigned 32 bit value.
 * @function
 * @returns {number} Value read
 */ Reader.prototype.uint32 = function read_uint32_setup() {
    var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
    return function read_uint32() {
        value = (this.buf[this.pos] & 127) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        /* istanbul ignore if */ if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
        }
        return value;
    };
}();
/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number} Value read
 */ Reader.prototype.int32 = function read_int32() {
    return this.uint32() | 0;
};
/**
 * Reads a zig-zag encoded varint as a signed 32 bit value.
 * @returns {number} Value read
 */ Reader.prototype.sint32 = function read_sint32() {
    var value = this.uint32();
    return value >>> 1 ^ -(value & 1) | 0;
};
/* eslint-disable no-invalid-this */ function readLongVarint() {
    // tends to deopt with local vars for octet etc.
    var bits = new LongBits(0, 0);
    var i = 0;
    if (this.len - this.pos > 4) {
        for(; i < 4; ++i){
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
        }
        // 5th
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
        if (this.buf[this.pos++] < 128) return bits;
        i = 0;
    } else {
        for(; i < 3; ++i){
            /* istanbul ignore if */ if (this.pos >= this.len) throw indexOutOfRange(this);
            // 1st..3th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
        }
        // 4th
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
    }
    if (this.len - this.pos > 4) {
        for(; i < 5; ++i){
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
        }
    } else {
        for(; i < 5; ++i){
            /* istanbul ignore if */ if (this.pos >= this.len) throw indexOutOfRange(this);
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
        }
    }
    /* istanbul ignore next */ throw Error("invalid varint encoding");
}
/* eslint-enable no-invalid-this */ /*
 * Reads a varint as a signed 64 bit value.
 * @name Reader#int64
 * @function
 * @returns {Long} Value read
 */ /*
 * Reads a varint as an unsigned 64 bit value.
 * @name Reader#uint64
 * @function
 * @returns {Long} Value read
 */ /*
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @name Reader#sint64
 * @function
 * @returns {Long} Value read
 */ /**
 * Reads a varint as a boolean.
 * @returns {boolean} Value read
 */ Reader.prototype.bool = function read_bool() {
    return this.uint32() !== 0;
};
function readFixed32_end(buf, end) {
    return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
}
/**
 * Reads fixed 32 bits as an unsigned 32 bit integer.
 * @returns {number} Value read
 */ Reader.prototype.fixed32 = function read_fixed32() {
    /* istanbul ignore if */ if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
    return readFixed32_end(this.buf, this.pos += 4);
};
/**
 * Reads fixed 32 bits as a signed 32 bit integer.
 * @returns {number} Value read
 */ Reader.prototype.sfixed32 = function read_sfixed32() {
    /* istanbul ignore if */ if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
    return readFixed32_end(this.buf, this.pos += 4) | 0;
};
/* eslint-disable no-invalid-this */ function readFixed64() {
    /* istanbul ignore if */ if (this.pos + 8 > this.len) throw indexOutOfRange(this, 8);
    return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
}
/* eslint-enable no-invalid-this */ /*
 * Reads fixed 64 bits.
 * @name Reader#fixed64
 * @function
 * @returns {Long} Value read
 */ /*
 * Reads zig-zag encoded fixed 64 bits.
 * @name Reader#sfixed64
 * @function
 * @returns {Long} Value read
 */ /**
 * Reads a float (32 bit) as a number.
 * @function
 * @returns {number} Value read
 */ Reader.prototype.float = function read_float() {
    /* istanbul ignore if */ if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
    var value = util.float.readFloatLE(this.buf, this.pos);
    this.pos += 4;
    return value;
};
/**
 * Reads a double (64 bit float) as a number.
 * @function
 * @returns {number} Value read
 */ Reader.prototype.double = function read_double() {
    /* istanbul ignore if */ if (this.pos + 8 > this.len) throw indexOutOfRange(this, 4);
    var value = util.float.readDoubleLE(this.buf, this.pos);
    this.pos += 8;
    return value;
};
/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @returns {Uint8Array} Value read
 */ Reader.prototype.bytes = function read_bytes() {
    var length = this.uint32(), start = this.pos, end = this.pos + length;
    /* istanbul ignore if */ if (end > this.len) throw indexOutOfRange(this, length);
    this.pos += length;
    if (Array.isArray(this.buf)) return this.buf.slice(start, end);
    return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
     ? new this.buf.constructor(0) : this._slice.call(this.buf, start, end);
};
/**
 * Reads a string preceeded by its byte length as a varint.
 * @returns {string} Value read
 */ Reader.prototype.string = function read_string() {
    var bytes = this.bytes();
    return utf8.read(bytes, 0, bytes.length);
};
/**
 * Skips the specified number of bytes if specified, otherwise skips a varint.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {Reader} `this`
 */ Reader.prototype.skip = function skip(length) {
    if (typeof length === "number") {
        /* istanbul ignore if */ if (this.pos + length > this.len) throw indexOutOfRange(this, length);
        this.pos += length;
    } else {
        do {
            /* istanbul ignore if */ if (this.pos >= this.len) throw indexOutOfRange(this);
        }while (this.buf[this.pos++] & 128)
    }
    return this;
};
/**
 * Skips the next element of the specified wire type.
 * @param {number} wireType Wire type received
 * @returns {Reader} `this`
 */ Reader.prototype.skipType = function(wireType) {
    switch(wireType){
        case 0:
            this.skip();
            break;
        case 1:
            this.skip(8);
            break;
        case 2:
            this.skip(this.uint32());
            break;
        case 3:
            while((wireType = this.uint32() & 7) !== 4){
                this.skipType(wireType);
            }
            break;
        case 5:
            this.skip(4);
            break;
        /* istanbul ignore next */ default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
    }
    return this;
};
Reader._configure = function(BufferReader_) {
    BufferReader = BufferReader_;
    var fn = util.Long ? "toLong" : /* istanbul ignore next */ "toNumber";
    util.merge(Reader.prototype, {
        int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
        },
        uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
        },
        sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
        },
        fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
        },
        sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
        }
    });
};
}),
"[project]/node_modules/@apollo/protobufjs/src/reader_buffer.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = BufferReader;
// extends Reader
var Reader = __turbopack_context__.r("[project]/node_modules/@apollo/protobufjs/src/reader.js [app-route] (ecmascript)");
(BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
var util = __turbopack_context__.r("[project]/node_modules/@apollo/protobufjs/src/util/minimal.js [app-route] (ecmascript)");
/**
 * Constructs a new buffer reader instance.
 * @classdesc Wire format reader using node buffers.
 * @extends Reader
 * @constructor
 * @param {Buffer} buffer Buffer to read from
 */ function BufferReader(buffer) {
    Reader.call(this, buffer);
/**
     * Read buffer.
     * @name BufferReader#buf
     * @type {Buffer}
     */ }
/* istanbul ignore else */ if (util.Buffer) BufferReader.prototype._slice = util.Buffer.prototype.slice;
/**
 * @override
 */ BufferReader.prototype.string = function read_string_buffer() {
    var len = this.uint32(); // modifies pos
    return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len));
}; /**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @name BufferReader#bytes
 * @function
 * @returns {Buffer} Value read
 */ 
}),
"[project]/node_modules/@apollo/protobufjs/src/rpc/service.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = Service;
var util = __turbopack_context__.r("[project]/node_modules/@apollo/protobufjs/src/util/minimal.js [app-route] (ecmascript)");
// Extends EventEmitter
(Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
/**
 * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
 *
 * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
 * @typedef rpc.ServiceMethodCallback
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {TRes} [response] Response message
 * @returns {undefined}
 */ /**
 * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
 * @typedef rpc.ServiceMethod
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
 * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
 */ /**
 * Constructs a new RPC service instance.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @exports rpc.Service
 * @extends util.EventEmitter
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 */ function Service(rpcImpl, requestDelimited, responseDelimited) {
    if (typeof rpcImpl !== "function") throw TypeError("rpcImpl must be a function");
    util.EventEmitter.call(this);
    /**
     * RPC implementation. Becomes `null` once the service is ended.
     * @type {RPCImpl|null}
     */ this.rpcImpl = rpcImpl;
    /**
     * Whether requests are length-delimited.
     * @type {boolean}
     */ this.requestDelimited = Boolean(requestDelimited);
    /**
     * Whether responses are length-delimited.
     * @type {boolean}
     */ this.responseDelimited = Boolean(responseDelimited);
}
/**
 * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
 * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
 * @param {Constructor<TReq>} requestCtor Request constructor
 * @param {Constructor<TRes>} responseCtor Response constructor
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
 * @returns {undefined}
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 */ Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
    if (!request) throw TypeError("request must be specified");
    var self = this;
    if (!callback) return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);
    if (!self.rpcImpl) {
        setTimeout(function() {
            callback(Error("already ended"));
        }, 0);
        return undefined;
    }
    try {
        return self.rpcImpl(method, requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(), function rpcCallback(err, response) {
            if (err) {
                self.emit("error", err, method);
                return callback(err);
            }
            if (response === null) {
                self.end(/* endedByRPC */ true);
                return undefined;
            }
            if (!(response instanceof responseCtor)) {
                try {
                    response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
                } catch (err) {
                    self.emit("error", err, method);
                    return callback(err);
                }
            }
            self.emit("data", response, method);
            return callback(null, response);
        });
    } catch (err) {
        self.emit("error", err, method);
        setTimeout(function() {
            callback(err);
        }, 0);
        return undefined;
    }
};
/**
 * Ends this service and emits the `end` event.
 * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
 * @returns {rpc.Service} `this`
 */ Service.prototype.end = function end(endedByRPC) {
    if (this.rpcImpl) {
        if (!endedByRPC) this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
    }
    return this;
};
}),
"[project]/node_modules/@apollo/protobufjs/src/rpc.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Streaming RPC helpers.
 * @namespace
 */ var rpc = exports;
/**
 * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
 * @typedef RPCImpl
 * @type {function}
 * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
 * @param {Uint8Array} requestData Request data
 * @param {RPCImplCallback} callback Callback function
 * @returns {undefined}
 * @example
 * function rpcImpl(method, requestData, callback) {
 *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
 *         throw Error("no such method");
 *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
 *         callback(err, responseData);
 *     });
 * }
 */ /**
 * Node-style callback as used by {@link RPCImpl}.
 * @typedef RPCImplCallback
 * @type {function}
 * @param {Error|null} error Error, if any, otherwise `null`
 * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
 * @returns {undefined}
 */ rpc.Service = __turbopack_context__.r("[project]/node_modules/@apollo/protobufjs/src/rpc/service.js [app-route] (ecmascript)");
}),
"[project]/node_modules/@apollo/protobufjs/src/roots.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = {}; /**
 * Named roots.
 * This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
 * Can also be used manually to make roots available accross modules.
 * @name roots
 * @type {Object.<string,Root>}
 * @example
 * // pbjs -r myroot -o compiled.js ...
 *
 * // in another module:
 * require("./compiled.js");
 *
 * // in any subsequent module:
 * var root = protobuf.roots["myroot"];
 */ 
}),
"[project]/node_modules/@apollo/protobufjs/src/index-minimal.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var protobuf = exports;
/**
 * Build type, one of `"full"`, `"light"` or `"minimal"`.
 * @name build
 * @type {string}
 * @const
 */ protobuf.build = "minimal";
// Serialization
protobuf.Writer = __turbopack_context__.r("[project]/node_modules/@apollo/protobufjs/src/writer.js [app-route] (ecmascript)");
protobuf.BufferWriter = __turbopack_context__.r("[project]/node_modules/@apollo/protobufjs/src/writer_buffer.js [app-route] (ecmascript)");
protobuf.Reader = __turbopack_context__.r("[project]/node_modules/@apollo/protobufjs/src/reader.js [app-route] (ecmascript)");
protobuf.BufferReader = __turbopack_context__.r("[project]/node_modules/@apollo/protobufjs/src/reader_buffer.js [app-route] (ecmascript)");
// Utility
protobuf.util = __turbopack_context__.r("[project]/node_modules/@apollo/protobufjs/src/util/minimal.js [app-route] (ecmascript)");
protobuf.rpc = __turbopack_context__.r("[project]/node_modules/@apollo/protobufjs/src/rpc.js [app-route] (ecmascript)");
protobuf.roots = __turbopack_context__.r("[project]/node_modules/@apollo/protobufjs/src/roots.js [app-route] (ecmascript)");
protobuf.configure = configure;
/* istanbul ignore next */ /**
 * Reconfigures the library according to the environment.
 * @returns {undefined}
 */ function configure() {
    protobuf.Reader._configure(protobuf.BufferReader);
    protobuf.util._configure();
}
// Set up buffer utility according to the environment
protobuf.Writer._configure(protobuf.BufferWriter);
configure();
}),
"[project]/node_modules/@apollo/protobufjs/minimal.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// minimal library entry point.
module.exports = __turbopack_context__.r("[project]/node_modules/@apollo/protobufjs/src/index-minimal.js [app-route] (ecmascript)");
}),
"[project]/node_modules/@apollo/utils.usagereporting/dist/calculateReferencedFieldsByType.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calculateReferencedFieldsByType = void 0;
const graphql_1 = __turbopack_context__.r("[project]/node_modules/graphql/index.mjs [app-route] (ecmascript)");
const usage_reporting_protobuf_1 = __turbopack_context__.r("[project]/node_modules/@apollo/usage-reporting-protobuf/generated/cjs/protobuf.js [app-route] (ecmascript)");
function calculateReferencedFieldsByType({ document, schema, resolvedOperationName }) {
    const documentSeparatedByOperation = (0, graphql_1.separateOperations)(document);
    const filteredDocument = documentSeparatedByOperation[resolvedOperationName !== null && resolvedOperationName !== void 0 ? resolvedOperationName : ""];
    if (!filteredDocument) {
        throw Error(`shouldn't happen: operation '${resolvedOperationName !== null && resolvedOperationName !== void 0 ? resolvedOperationName : ""}' not found`);
    }
    const typeInfo = new graphql_1.TypeInfo(schema);
    const interfaces = new Set();
    const referencedFieldSetByType = Object.create(null);
    (0, graphql_1.visit)(filteredDocument, (0, graphql_1.visitWithTypeInfo)(typeInfo, {
        Field (field) {
            const fieldName = field.name.value;
            const parentType = typeInfo.getParentType();
            if (!parentType) {
                throw Error(`shouldn't happen: missing parent type for field ${fieldName}`);
            }
            const parentTypeName = parentType.name;
            if (!referencedFieldSetByType[parentTypeName]) {
                referencedFieldSetByType[parentTypeName] = new Set();
                if ((0, graphql_1.isInterfaceType)(parentType)) {
                    interfaces.add(parentTypeName);
                }
            }
            referencedFieldSetByType[parentTypeName].add(fieldName);
        }
    }));
    const referencedFieldsByType = Object.create(null);
    for (const [typeName, fieldNames] of Object.entries(referencedFieldSetByType)){
        referencedFieldsByType[typeName] = new usage_reporting_protobuf_1.ReferencedFieldsForType({
            fieldNames: [
                ...fieldNames
            ],
            isInterface: interfaces.has(typeName)
        });
    }
    return referencedFieldsByType;
}
exports.calculateReferencedFieldsByType = calculateReferencedFieldsByType; //# sourceMappingURL=calculateReferencedFieldsByType.js.map
}),
"[project]/node_modules/@apollo/utils.usagereporting/dist/signature.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.usageReportingSignature = void 0;
const utils_dropunuseddefinitions_1 = __turbopack_context__.r("[project]/node_modules/@apollo/utils.dropunuseddefinitions/dist/index.js [app-route] (ecmascript)");
const utils_stripsensitiveliterals_1 = __turbopack_context__.r("[project]/node_modules/@apollo/utils.stripsensitiveliterals/dist/index.js [app-route] (ecmascript)");
const utils_printwithreducedwhitespace_1 = __turbopack_context__.r("[project]/node_modules/@apollo/utils.printwithreducedwhitespace/dist/index.js [app-route] (ecmascript)");
const utils_removealiases_1 = __turbopack_context__.r("[project]/node_modules/@apollo/utils.removealiases/dist/index.js [app-route] (ecmascript)");
const utils_sortast_1 = __turbopack_context__.r("[project]/node_modules/@apollo/utils.sortast/dist/index.js [app-route] (ecmascript)");
function usageReportingSignature(ast, operationName) {
    return (0, utils_printwithreducedwhitespace_1.printWithReducedWhitespace)((0, utils_sortast_1.sortAST)((0, utils_removealiases_1.removeAliases)((0, utils_stripsensitiveliterals_1.stripSensitiveLiterals)((0, utils_dropunuseddefinitions_1.dropUnusedDefinitions)(ast, operationName), {
        hideListAndObjectLiterals: true
    }))));
}
exports.usageReportingSignature = usageReportingSignature; //# sourceMappingURL=signature.js.map
}),
"[project]/node_modules/@apollo/utils.usagereporting/dist/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.usageReportingSignature = exports.calculateReferencedFieldsByType = void 0;
var calculateReferencedFieldsByType_1 = __turbopack_context__.r("[project]/node_modules/@apollo/utils.usagereporting/dist/calculateReferencedFieldsByType.js [app-route] (ecmascript)");
Object.defineProperty(exports, "calculateReferencedFieldsByType", {
    enumerable: true,
    get: function() {
        return calculateReferencedFieldsByType_1.calculateReferencedFieldsByType;
    }
});
var signature_1 = __turbopack_context__.r("[project]/node_modules/@apollo/utils.usagereporting/dist/signature.js [app-route] (ecmascript)");
Object.defineProperty(exports, "usageReportingSignature", {
    enumerable: true,
    get: function() {
        return signature_1.usageReportingSignature;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/@apollo/utils.dropunuseddefinitions/dist/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dropUnusedDefinitions = void 0;
const graphql_1 = __turbopack_context__.r("[project]/node_modules/graphql/index.mjs [app-route] (ecmascript)");
function dropUnusedDefinitions(ast, operationName) {
    const separated = (0, graphql_1.separateOperations)(ast)[operationName];
    if (!separated) {
        return ast;
    }
    return separated;
}
exports.dropUnusedDefinitions = dropUnusedDefinitions; //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/@apollo/utils.stripsensitiveliterals/dist/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stripSensitiveLiterals = void 0;
const graphql_1 = __turbopack_context__.r("[project]/node_modules/graphql/index.mjs [app-route] (ecmascript)");
function stripSensitiveLiterals(ast, options = {
    hideListAndObjectLiterals: false
}) {
    const listAndObjectVisitorIfEnabled = options.hideListAndObjectLiterals ? {
        ListValue (node) {
            return {
                ...node,
                values: []
            };
        },
        ObjectValue (node) {
            return {
                ...node,
                fields: []
            };
        }
    } : {};
    return (0, graphql_1.visit)(ast, {
        IntValue (node) {
            return {
                ...node,
                value: "0"
            };
        },
        FloatValue (node) {
            return {
                ...node,
                value: "0"
            };
        },
        StringValue (node) {
            return {
                ...node,
                value: "",
                block: false
            };
        },
        ...listAndObjectVisitorIfEnabled
    });
}
exports.stripSensitiveLiterals = stripSensitiveLiterals; //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/@apollo/utils.printwithreducedwhitespace/dist/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.printWithReducedWhitespace = void 0;
const graphql_1 = __turbopack_context__.r("[project]/node_modules/graphql/index.mjs [app-route] (ecmascript)");
function printWithReducedWhitespace(ast) {
    const sanitizedAST = (0, graphql_1.visit)(ast, {
        StringValue (node) {
            return {
                ...node,
                value: Buffer.from(node.value, "utf8").toString("hex"),
                block: false
            };
        }
    });
    const withWhitespace = (0, graphql_1.print)(sanitizedAST);
    const minimizedButStillHex = withWhitespace.replace(/\s+/g, " ").replace(/([^_a-zA-Z0-9]) /g, (_, c)=>c).replace(/ ([^_a-zA-Z0-9])/g, (_, c)=>c);
    return minimizedButStillHex.replace(/"([a-f0-9]+)"/g, (_, hex)=>JSON.stringify(Buffer.from(hex, "hex").toString("utf8")));
}
exports.printWithReducedWhitespace = printWithReducedWhitespace; //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/@apollo/utils.removealiases/dist/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeAliases = void 0;
const graphql_1 = __turbopack_context__.r("[project]/node_modules/graphql/index.mjs [app-route] (ecmascript)");
function removeAliases(ast) {
    return (0, graphql_1.visit)(ast, {
        Field (node) {
            const { alias, ...rest } = node;
            return rest;
        }
    });
}
exports.removeAliases = removeAliases; //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/lodash.sortby/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** Used as the size to enable large array optimizations. */ var LARGE_ARRAY_SIZE = 200;
/** Used as the `TypeError` message for "Functions" methods. */ var FUNC_ERROR_TEXT = 'Expected a function';
/** Used to stand-in for `undefined` hash values. */ var HASH_UNDEFINED = '__lodash_hash_undefined__';
/** Used to compose bitmasks for comparison styles. */ var UNORDERED_COMPARE_FLAG = 1, PARTIAL_COMPARE_FLAG = 2;
/** Used as references for various `Number` constants. */ var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991;
/** `Object#toString` result references. */ var argsTag = '[object Arguments]', arrayTag = '[object Array]', boolTag = '[object Boolean]', dateTag = '[object Date]', errorTag = '[object Error]', funcTag = '[object Function]', genTag = '[object GeneratorFunction]', mapTag = '[object Map]', numberTag = '[object Number]', objectTag = '[object Object]', promiseTag = '[object Promise]', regexpTag = '[object RegExp]', setTag = '[object Set]', stringTag = '[object String]', symbolTag = '[object Symbol]', weakMapTag = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]', dataViewTag = '[object DataView]', float32Tag = '[object Float32Array]', float64Tag = '[object Float64Array]', int8Tag = '[object Int8Array]', int16Tag = '[object Int16Array]', int32Tag = '[object Int32Array]', uint8Tag = '[object Uint8Array]', uint8ClampedTag = '[object Uint8ClampedArray]', uint16Tag = '[object Uint16Array]', uint32Tag = '[object Uint32Array]';
/** Used to match property names within property paths. */ var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, reLeadingDot = /^\./, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */ var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to match backslashes in property paths. */ var reEscapeChar = /\\(\\)?/g;
/** Used to detect host constructors (Safari). */ var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used to detect unsigned integer values. */ var reIsUint = /^(?:0|[1-9]\d*)$/;
/** Used to identify `toStringTag` values of typed arrays. */ var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
/** Detect free variable `global` from Node.js. */ var freeGlobal = ("TURBOPACK compile-time value", "object") == 'object' && /*TURBOPACK member replacement*/ __turbopack_context__.g && /*TURBOPACK member replacement*/ __turbopack_context__.g.Object === Object && /*TURBOPACK member replacement*/ __turbopack_context__.g;
/** Detect free variable `self`. */ var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */ var root = freeGlobal || freeSelf || Function('return this')();
/** Detect free variable `exports`. */ var freeExports = ("TURBOPACK compile-time value", "object") == 'object' && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */ var freeModule = freeExports && ("TURBOPACK compile-time value", "object") == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */ var moduleExports = freeModule && freeModule.exports === freeExports;
/** Detect free variable `process` from Node.js. */ var freeProcess = moduleExports && freeGlobal.process;
/** Used to access faster Node.js helpers. */ var nodeUtil = function() {
    try {
        return freeProcess && freeProcess.binding('util');
    } catch (e) {}
}();
/* Node.js helper references. */ var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */ function apply(func, thisArg, args) {
    switch(args.length){
        case 0:
            return func.call(thisArg);
        case 1:
            return func.call(thisArg, args[0]);
        case 2:
            return func.call(thisArg, args[0], args[1]);
        case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
}
/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */ function arrayMap(array, iteratee) {
    var index = -1, length = array ? array.length : 0, result = Array(length);
    while(++index < length){
        result[index] = iteratee(array[index], index, array);
    }
    return result;
}
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */ function arrayPush(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while(++index < length){
        array[offset + index] = values[index];
    }
    return array;
}
/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */ function arraySome(array, predicate) {
    var index = -1, length = array ? array.length : 0;
    while(++index < length){
        if (predicate(array[index], index, array)) {
            return true;
        }
    }
    return false;
}
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */ function baseProperty(key) {
    return function(object) {
        return object == null ? undefined : object[key];
    };
}
/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */ function baseSortBy(array, comparer) {
    var length = array.length;
    array.sort(comparer);
    while(length--){
        array[length] = array[length].value;
    }
    return array;
}
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */ function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while(++index < n){
        result[index] = iteratee(index);
    }
    return result;
}
/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */ function baseUnary(func) {
    return function(value) {
        return func(value);
    };
}
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */ function getValue(object, key) {
    return object == null ? undefined : object[key];
}
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */ function isHostObject(value) {
    // Many host objects are `Object` objects that can coerce to strings
    // despite having improperly defined `toString` methods.
    var result = false;
    if (value != null && typeof value.toString != 'function') {
        try {
            result = !!(value + '');
        } catch (e) {}
    }
    return result;
}
/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */ function mapToArray(map) {
    var index = -1, result = Array(map.size);
    map.forEach(function(value, key) {
        result[++index] = [
            key,
            value
        ];
    });
    return result;
}
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */ function overArg(func, transform) {
    return function(arg) {
        return func(transform(arg));
    };
}
/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */ function setToArray(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function(value) {
        result[++index] = value;
    });
    return result;
}
/** Used for built-in method references. */ var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
/** Used to detect overreaching core-js shims. */ var coreJsData = root['__core-js_shared__'];
/** Used to detect methods masquerading as native. */ var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? 'Symbol(src)_1.' + uid : '';
}();
/** Used to resolve the decompiled source of functions. */ var funcToString = funcProto.toString;
/** Used to check objects for own properties. */ var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
/** Used to detect if a method is native. */ var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/** Built-in value references. */ var Symbol = root.Symbol, Uint8Array = root.Uint8Array, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;
/* Built-in method references for those with the same name as other `lodash` methods. */ var nativeKeys = overArg(Object.keys, Object), nativeMax = Math.max;
/* Built-in method references that are verified to be native. */ var DataView = getNative(root, 'DataView'), Map = getNative(root, 'Map'), Promise = getNative(root, 'Promise'), Set = getNative(root, 'Set'), WeakMap = getNative(root, 'WeakMap'), nativeCreate = getNative(Object, 'create');
/** Used to detect maps, sets, and weakmaps. */ var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
/** Used to convert symbols to primitives and strings. */ var symbolProto = Symbol ? Symbol.prototype : undefined, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined, symbolToString = symbolProto ? symbolProto.toString : undefined;
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function Hash(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while(++index < length){
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */ function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
}
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function hashDelete(key) {
    return this.has(key) && delete this.__data__[key];
}
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : undefined;
}
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */ function hashSet(key, value) {
    var data = this.__data__;
    data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
    return this;
}
// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function ListCache(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while(++index < length){
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */ function listCacheClear() {
    this.__data__ = [];
}
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
        return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
        data.pop();
    } else {
        splice.call(data, index, 1);
    }
    return true;
}
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1];
}
/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
}
/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */ function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
        data.push([
            key,
            value
        ]);
    } else {
        data[index][1] = value;
    }
    return this;
}
// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function MapCache(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while(++index < length){
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */ function mapCacheClear() {
    this.__data__ = {
        'hash': new Hash,
        'map': new (Map || ListCache),
        'string': new Hash
    };
}
/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function mapCacheDelete(key) {
    return getMapData(this, key)['delete'](key);
}
/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function mapCacheGet(key) {
    return getMapData(this, key).get(key);
}
/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function mapCacheHas(key) {
    return getMapData(this, key).has(key);
}
/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */ function mapCacheSet(key, value) {
    getMapData(this, key).set(key, value);
    return this;
}
// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */ function SetCache(values) {
    var index = -1, length = values ? values.length : 0;
    this.__data__ = new MapCache;
    while(++index < length){
        this.add(values[index]);
    }
}
/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */ function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
}
/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */ function setCacheHas(value) {
    return this.__data__.has(value);
}
// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function Stack(entries) {
    this.__data__ = new ListCache(entries);
}
/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */ function stackClear() {
    this.__data__ = new ListCache;
}
/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function stackDelete(key) {
    return this.__data__['delete'](key);
}
/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function stackGet(key) {
    return this.__data__.get(key);
}
/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function stackHas(key) {
    return this.__data__.has(key);
}
/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */ function stackSet(key, value) {
    var cache = this.__data__;
    if (cache instanceof ListCache) {
        var pairs = cache.__data__;
        if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
            pairs.push([
                key,
                value
            ]);
            return this;
        }
        cache = this.__data__ = new MapCache(pairs);
    }
    cache.set(key, value);
    return this;
}
// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */ function arrayLikeKeys(value, inherited) {
    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
    // Safari 9 makes `arguments.length` enumerable in strict mode.
    var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
    var length = result.length, skipIndexes = !!length;
    for(var key in value){
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
            result.push(key);
        }
    }
    return result;
}
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */ function assocIndexOf(array, key) {
    var length = array.length;
    while(length--){
        if (eq(array[length][0], key)) {
            return length;
        }
    }
    return -1;
}
/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */ var baseEach = createBaseEach(baseForOwn);
/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */ function baseFlatten(array, depth, predicate, isStrict, result) {
    var index = -1, length = array.length;
    predicate || (predicate = isFlattenable);
    result || (result = []);
    while(++index < length){
        var value = array[index];
        if (depth > 0 && predicate(value)) {
            if (depth > 1) {
                // Recursively flatten arrays (susceptible to call stack limits).
                baseFlatten(value, depth - 1, predicate, isStrict, result);
            } else {
                arrayPush(result, value);
            }
        } else if (!isStrict) {
            result[result.length] = value;
        }
    }
    return result;
}
/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */ var baseFor = createBaseFor();
/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */ function baseForOwn(object, iteratee) {
    return object && baseFor(object, iteratee, keys);
}
/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */ function baseGet(object, path) {
    path = isKey(path, object) ? [
        path
    ] : castPath(path);
    var index = 0, length = path.length;
    while(object != null && index < length){
        object = object[toKey(path[index++])];
    }
    return index && index == length ? object : undefined;
}
/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */ function baseGetTag(value) {
    return objectToString.call(value);
}
/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */ function baseHasIn(object, key) {
    return object != null && key in Object(object);
}
/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */ function baseIsEqual(value, other, customizer, bitmask, stack) {
    if (value === other) {
        return true;
    }
    if (value == null || other == null || !isObject(value) && !isObjectLike(other)) {
        return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}
/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */ function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
    var objIsArr = isArray(object), othIsArr = isArray(other), objTag = arrayTag, othTag = arrayTag;
    if (!objIsArr) {
        objTag = getTag(object);
        objTag = objTag == argsTag ? objectTag : objTag;
    }
    if (!othIsArr) {
        othTag = getTag(other);
        othTag = othTag == argsTag ? objectTag : othTag;
    }
    var objIsObj = objTag == objectTag && !isHostObject(object), othIsObj = othTag == objectTag && !isHostObject(other), isSameTag = objTag == othTag;
    if (isSameTag && !objIsObj) {
        stack || (stack = new Stack);
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, equalFunc, customizer, bitmask, stack) : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
    }
    if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'), othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
        if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new Stack);
            return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
        }
    }
    if (!isSameTag) {
        return false;
    }
    stack || (stack = new Stack);
    return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}
/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */ function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length, length = index, noCustomizer = !customizer;
    if (object == null) {
        return !length;
    }
    object = Object(object);
    while(index--){
        var data = matchData[index];
        if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
            return false;
        }
    }
    while(++index < length){
        data = matchData[index];
        var key = data[0], objValue = object[key], srcValue = data[1];
        if (noCustomizer && data[2]) {
            if (objValue === undefined && !(key in object)) {
                return false;
            }
        } else {
            var stack = new Stack;
            if (customizer) {
                var result = customizer(objValue, srcValue, key, object, source, stack);
            }
            if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack) : result)) {
                return false;
            }
        }
    }
    return true;
}
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */ function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
        return false;
    }
    var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
}
/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */ function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}
/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */ function baseIteratee(value) {
    // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
    // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
    if (typeof value == 'function') {
        return value;
    }
    if (value == null) {
        return identity;
    }
    if (typeof value == 'object') {
        return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
    }
    return property(value);
}
/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */ function baseKeys(object) {
    if (!isPrototype(object)) {
        return nativeKeys(object);
    }
    var result = [];
    for(var key in Object(object)){
        if (hasOwnProperty.call(object, key) && key != 'constructor') {
            result.push(key);
        }
    }
    return result;
}
/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */ function baseMap(collection, iteratee) {
    var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
    baseEach(collection, function(value, key, collection) {
        result[++index] = iteratee(value, key, collection);
    });
    return result;
}
/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */ function baseMatches(source) {
    var matchData = getMatchData(source);
    if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
    }
    return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
    };
}
/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */ function baseMatchesProperty(path, srcValue) {
    if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
    }
    return function(object) {
        var objValue = get(object, path);
        return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
    };
}
/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */ function baseOrderBy(collection, iteratees, orders) {
    var index = -1;
    iteratees = arrayMap(iteratees.length ? iteratees : [
        identity
    ], baseUnary(baseIteratee));
    var result = baseMap(collection, function(value, key, collection) {
        var criteria = arrayMap(iteratees, function(iteratee) {
            return iteratee(value);
        });
        return {
            'criteria': criteria,
            'index': ++index,
            'value': value
        };
    });
    return baseSortBy(result, function(object, other) {
        return compareMultiple(object, other, orders);
    });
}
/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */ function basePropertyDeep(path) {
    return function(object) {
        return baseGet(object, path);
    };
}
/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */ function baseRest(func, start) {
    start = nativeMax(start === undefined ? func.length - 1 : start, 0);
    return function() {
        var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
        while(++index < length){
            array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while(++index < start){
            otherArgs[index] = args[index];
        }
        otherArgs[start] = array;
        return apply(func, this, otherArgs);
    };
}
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */ function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
        return value;
    }
    if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
    }
    var result = value + '';
    return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}
/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */ function castPath(value) {
    return isArray(value) ? value : stringToPath(value);
}
/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */ function compareAscending(value, other) {
    if (value !== other) {
        var valIsDefined = value !== undefined, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
        var othIsDefined = other !== undefined, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
        if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
            return 1;
        }
        if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
            return -1;
        }
    }
    return 0;
}
/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */ function compareMultiple(object, other, orders) {
    var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
    while(++index < length){
        var result = compareAscending(objCriteria[index], othCriteria[index]);
        if (result) {
            if (index >= ordersLength) {
                return result;
            }
            var order = orders[index];
            return result * (order == 'desc' ? -1 : 1);
        }
    }
    // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
    // that causes it, under certain circumstances, to provide the same value for
    // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
    // for more details.
    //
    // This also ensures a stable sort in V8 and other engines.
    // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
    return object.index - other.index;
}
/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */ function createBaseEach(eachFunc, fromRight) {
    return function(collection, iteratee) {
        if (collection == null) {
            return collection;
        }
        if (!isArrayLike(collection)) {
            return eachFunc(collection, iteratee);
        }
        var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
        while(fromRight ? index-- : ++index < length){
            if (iteratee(iterable[index], index, iterable) === false) {
                break;
            }
        }
        return collection;
    };
}
/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */ function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
        var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
        while(length--){
            var key = props[fromRight ? length : ++index];
            if (iteratee(iterable[key], key, iterable) === false) {
                break;
            }
        }
        return object;
    };
}
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */ function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
    var isPartial = bitmask & PARTIAL_COMPARE_FLAG, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
    }
    // Assume cyclic values are equal.
    var stacked = stack.get(array);
    if (stacked && stack.get(other)) {
        return stacked == other;
    }
    var index = -1, result = true, seen = bitmask & UNORDERED_COMPARE_FLAG ? new SetCache : undefined;
    stack.set(array, other);
    stack.set(other, array);
    // Ignore non-index properties.
    while(++index < arrLength){
        var arrValue = array[index], othValue = other[index];
        if (customizer) {
            var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== undefined) {
            if (compared) {
                continue;
            }
            result = false;
            break;
        }
        // Recursively compare arrays (susceptible to call stack limits).
        if (seen) {
            if (!arraySome(other, function(othValue, othIndex) {
                if (!seen.has(othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
                    return seen.add(othIndex);
                }
            })) {
                result = false;
                break;
            }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
            result = false;
            break;
        }
    }
    stack['delete'](array);
    stack['delete'](other);
    return result;
}
/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */ function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
    switch(tag){
        case dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                return false;
            }
            object = object.buffer;
            other = other.buffer;
        case arrayBufferTag:
            if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
                return false;
            }
            return true;
        case boolTag:
        case dateTag:
        case numberTag:
            // Coerce booleans to `1` or `0` and dates to milliseconds.
            // Invalid dates are coerced to `NaN`.
            return eq(+object, +other);
        case errorTag:
            return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
            // Coerce regexes to strings and treat strings, primitives and objects,
            // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
            // for more details.
            return object == other + '';
        case mapTag:
            var convert = mapToArray;
        case setTag:
            var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
            convert || (convert = setToArray);
            if (object.size != other.size && !isPartial) {
                return false;
            }
            // Assume cyclic values are equal.
            var stacked = stack.get(object);
            if (stacked) {
                return stacked == other;
            }
            bitmask |= UNORDERED_COMPARE_FLAG;
            // Recursively compare objects (susceptible to call stack limits).
            stack.set(object, other);
            var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
            stack['delete'](object);
            return result;
        case symbolTag:
            if (symbolValueOf) {
                return symbolValueOf.call(object) == symbolValueOf.call(other);
            }
    }
    return false;
}
/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */ function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
    var isPartial = bitmask & PARTIAL_COMPARE_FLAG, objProps = keys(object), objLength = objProps.length, othProps = keys(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) {
        return false;
    }
    var index = objLength;
    while(index--){
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
            return false;
        }
    }
    // Assume cyclic values are equal.
    var stacked = stack.get(object);
    if (stacked && stack.get(other)) {
        return stacked == other;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;
    while(++index < objLength){
        key = objProps[index];
        var objValue = object[key], othValue = other[key];
        if (customizer) {
            var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        }
        // Recursively compare objects (susceptible to call stack limits).
        if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack) : compared)) {
            result = false;
            break;
        }
        skipCtor || (skipCtor = key == 'constructor');
    }
    if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        // Non `Object` object instances with different constructors are not equal.
        if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
            result = false;
        }
    }
    stack['delete'](object);
    stack['delete'](other);
    return result;
}
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */ function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}
/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */ function getMatchData(object) {
    var result = keys(object), length = result.length;
    while(length--){
        var key = result[length], value = object[key];
        result[length] = [
            key,
            value,
            isStrictComparable(value)
        ];
    }
    return result;
}
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */ function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
}
/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */ var getTag = baseGetTag;
// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set) != setTag || WeakMap && getTag(new WeakMap) != weakMapTag) {
    getTag = function(value) {
        var result = objectToString.call(value), Ctor = result == objectTag ? value.constructor : undefined, ctorString = Ctor ? toSource(Ctor) : undefined;
        if (ctorString) {
            switch(ctorString){
                case dataViewCtorString:
                    return dataViewTag;
                case mapCtorString:
                    return mapTag;
                case promiseCtorString:
                    return promiseTag;
                case setCtorString:
                    return setTag;
                case weakMapCtorString:
                    return weakMapTag;
            }
        }
        return result;
    };
}
/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */ function hasPath(object, path, hasFunc) {
    path = isKey(path, object) ? [
        path
    ] : castPath(path);
    var result, index = -1, length = path.length;
    while(++index < length){
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
            break;
        }
        object = object[key];
    }
    if (result) {
        return result;
    }
    var length = object ? object.length : 0;
    return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
}
/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */ function isFlattenable(value) {
    return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */ function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */ function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
        return false;
    }
    var type = typeof index;
    if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
        return eq(object[index], value);
    }
    return false;
}
/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */ function isKey(value, object) {
    if (isArray(value)) {
        return false;
    }
    var type = typeof value;
    if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
        return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */ function isKeyable(value) {
    var type = typeof value;
    return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */ function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
}
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */ function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
    return value === proto;
}
/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */ function isStrictComparable(value) {
    return value === value && !isObject(value);
}
/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */ function matchesStrictComparable(key, srcValue) {
    return function(object) {
        if (object == null) {
            return false;
        }
        return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
    };
}
/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */ var stringToPath = memoize(function(string) {
    string = toString(string);
    var result = [];
    if (reLeadingDot.test(string)) {
        result.push('');
    }
    string.replace(rePropName, function(match, number, quote, string) {
        result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
    });
    return result;
});
/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */ function toKey(value) {
    if (typeof value == 'string' || isSymbol(value)) {
        return value;
    }
    var result = value + '';
    return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */ function toSource(func) {
    if (func != null) {
        try {
            return funcToString.call(func);
        } catch (e) {}
        try {
            return func + '';
        } catch (e) {}
    }
    return '';
}
/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * _.sortBy(users, function(o) { return o.user; });
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 *
 * _.sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
 *
 * _.sortBy(users, 'user', function(o) {
 *   return Math.floor(o.age / 10);
 * });
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 */ var sortBy = baseRest(function(collection, iteratees) {
    if (collection == null) {
        return [];
    }
    var length = iteratees.length;
    if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
        iteratees = [];
    } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
        iteratees = [
            iteratees[0]
        ];
    }
    return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
});
/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */ function memoize(func, resolver) {
    if (typeof func != 'function' || resolver && typeof resolver != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) {
            return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
    };
    memoized.cache = new (memoize.Cache || MapCache);
    return memoized;
}
// Assign cache to `_.memoize`.
memoize.Cache = MapCache;
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */ function eq(value, other) {
    return value === other || value !== value && other !== other;
}
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */ function isArguments(value) {
    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
    return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */ var isArray = Array.isArray;
/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */ function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
}
/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */ function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
}
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */ function isFunction(value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 8-9 which returns 'object' for typed array and other constructors.
    var tag = isObject(value) ? objectToString.call(value) : '';
    return tag == funcTag || tag == genTag;
}
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */ function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */ function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function isObjectLike(value) {
    return !!value && typeof value == 'object';
}
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */ function isSymbol(value) {
    return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */ var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */ function toString(value) {
    return value == null ? '' : baseToString(value);
}
/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */ function get(object, path, defaultValue) {
    var result = object == null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
}
/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */ function hasIn(object, path) {
    return object != null && hasPath(object, path, baseHasIn);
}
/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */ function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */ function identity(value) {
    return value;
}
/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */ function property(path) {
    return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}
module.exports = sortBy;
}),
"[project]/node_modules/@apollo/utils.sortast/dist/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sortAST = void 0;
const graphql_1 = __turbopack_context__.r("[project]/node_modules/graphql/index.mjs [app-route] (ecmascript)");
const lodash_sortby_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/lodash.sortby/index.js [app-route] (ecmascript)"));
function sortAST(ast) {
    return (0, graphql_1.visit)(ast, {
        Document (node) {
            return {
                ...node,
                definitions: (0, lodash_sortby_1.default)(node.definitions, "kind", "name.value")
            };
        },
        OperationDefinition (node) {
            return sortVariableDefinitions(node);
        },
        SelectionSet (node) {
            return {
                ...node,
                selections: (0, lodash_sortby_1.default)(node.selections, "kind", "name.value")
            };
        },
        Field (node) {
            return sortArguments(node);
        },
        FragmentSpread (node) {
            return sortDirectives(node);
        },
        InlineFragment (node) {
            return sortDirectives(node);
        },
        FragmentDefinition (node) {
            return sortDirectives(sortVariableDefinitions(node));
        },
        Directive (node) {
            return sortArguments(node);
        }
    });
}
exports.sortAST = sortAST;
function sortDirectives(node) {
    return "directives" in node ? {
        ...node,
        directives: (0, lodash_sortby_1.default)(node.directives, "name.value")
    } : node;
}
function sortArguments(node) {
    return "arguments" in node ? {
        ...node,
        arguments: (0, lodash_sortby_1.default)(node.arguments, "name.value")
    } : node;
}
function sortVariableDefinitions(node) {
    return "variableDefinitions" in node ? {
        ...node,
        variableDefinitions: (0, lodash_sortby_1.default)(node.variableDefinitions, "variable.name.value")
    } : node;
} //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/retry/lib/retry_operation.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

function RetryOperation(timeouts, options) {
    // Compatibility for the old (timeouts, retryForever) signature
    if (typeof options === 'boolean') {
        options = {
            forever: options
        };
    }
    this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
    this._timeouts = timeouts;
    this._options = options || {};
    this._maxRetryTime = options && options.maxRetryTime || Infinity;
    this._fn = null;
    this._errors = [];
    this._attempts = 1;
    this._operationTimeout = null;
    this._operationTimeoutCb = null;
    this._timeout = null;
    this._operationStart = null;
    this._timer = null;
    if (this._options.forever) {
        this._cachedTimeouts = this._timeouts.slice(0);
    }
}
module.exports = RetryOperation;
RetryOperation.prototype.reset = function() {
    this._attempts = 1;
    this._timeouts = this._originalTimeouts.slice(0);
};
RetryOperation.prototype.stop = function() {
    if (this._timeout) {
        clearTimeout(this._timeout);
    }
    if (this._timer) {
        clearTimeout(this._timer);
    }
    this._timeouts = [];
    this._cachedTimeouts = null;
};
RetryOperation.prototype.retry = function(err) {
    if (this._timeout) {
        clearTimeout(this._timeout);
    }
    if (!err) {
        return false;
    }
    var currentTime = new Date().getTime();
    if (err && currentTime - this._operationStart >= this._maxRetryTime) {
        this._errors.push(err);
        this._errors.unshift(new Error('RetryOperation timeout occurred'));
        return false;
    }
    this._errors.push(err);
    var timeout = this._timeouts.shift();
    if (timeout === undefined) {
        if (this._cachedTimeouts) {
            // retry forever, only keep last error
            this._errors.splice(0, this._errors.length - 1);
            timeout = this._cachedTimeouts.slice(-1);
        } else {
            return false;
        }
    }
    var self = this;
    this._timer = setTimeout(function() {
        self._attempts++;
        if (self._operationTimeoutCb) {
            self._timeout = setTimeout(function() {
                self._operationTimeoutCb(self._attempts);
            }, self._operationTimeout);
            if (self._options.unref) {
                self._timeout.unref();
            }
        }
        self._fn(self._attempts);
    }, timeout);
    if (this._options.unref) {
        this._timer.unref();
    }
    return true;
};
RetryOperation.prototype.attempt = function(fn, timeoutOps) {
    this._fn = fn;
    if (timeoutOps) {
        if (timeoutOps.timeout) {
            this._operationTimeout = timeoutOps.timeout;
        }
        if (timeoutOps.cb) {
            this._operationTimeoutCb = timeoutOps.cb;
        }
    }
    var self = this;
    if (this._operationTimeoutCb) {
        this._timeout = setTimeout(function() {
            self._operationTimeoutCb();
        }, self._operationTimeout);
    }
    this._operationStart = new Date().getTime();
    this._fn(this._attempts);
};
RetryOperation.prototype.try = function(fn) {
    console.log('Using RetryOperation.try() is deprecated');
    this.attempt(fn);
};
RetryOperation.prototype.start = function(fn) {
    console.log('Using RetryOperation.start() is deprecated');
    this.attempt(fn);
};
RetryOperation.prototype.start = RetryOperation.prototype.try;
RetryOperation.prototype.errors = function() {
    return this._errors;
};
RetryOperation.prototype.attempts = function() {
    return this._attempts;
};
RetryOperation.prototype.mainError = function() {
    if (this._errors.length === 0) {
        return null;
    }
    var counts = {};
    var mainError = null;
    var mainErrorCount = 0;
    for(var i = 0; i < this._errors.length; i++){
        var error = this._errors[i];
        var message = error.message;
        var count = (counts[message] || 0) + 1;
        counts[message] = count;
        if (count >= mainErrorCount) {
            mainError = error;
            mainErrorCount = count;
        }
    }
    return mainError;
};
}),
"[project]/node_modules/retry/lib/retry.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var RetryOperation = __turbopack_context__.r("[project]/node_modules/retry/lib/retry_operation.js [app-route] (ecmascript)");
exports.operation = function(options) {
    var timeouts = exports.timeouts(options);
    return new RetryOperation(timeouts, {
        forever: options && (options.forever || options.retries === Infinity),
        unref: options && options.unref,
        maxRetryTime: options && options.maxRetryTime
    });
};
exports.timeouts = function(options) {
    if (options instanceof Array) {
        return [].concat(options);
    }
    var opts = {
        retries: 10,
        factor: 2,
        minTimeout: 1 * 1000,
        maxTimeout: Infinity,
        randomize: false
    };
    for(var key in options){
        opts[key] = options[key];
    }
    if (opts.minTimeout > opts.maxTimeout) {
        throw new Error('minTimeout is greater than maxTimeout');
    }
    var timeouts = [];
    for(var i = 0; i < opts.retries; i++){
        timeouts.push(this.createTimeout(i, opts));
    }
    if (options && options.forever && !timeouts.length) {
        timeouts.push(this.createTimeout(i, opts));
    }
    // sort the array numerically ascending
    timeouts.sort(function(a, b) {
        return a - b;
    });
    return timeouts;
};
exports.createTimeout = function(attempt, opts) {
    var random = opts.randomize ? Math.random() + 1 : 1;
    var timeout = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
    timeout = Math.min(timeout, opts.maxTimeout);
    return timeout;
};
exports.wrap = function(obj, options, methods) {
    if (options instanceof Array) {
        methods = options;
        options = null;
    }
    if (!methods) {
        methods = [];
        for(var key in obj){
            if (typeof obj[key] === 'function') {
                methods.push(key);
            }
        }
    }
    for(var i = 0; i < methods.length; i++){
        var method = methods[i];
        var original = obj[method];
        obj[method] = (function retryWrapper(original) {
            var op = exports.operation(options);
            var args = Array.prototype.slice.call(arguments, 1);
            var callback = args.pop();
            args.push(function(err) {
                if (op.retry(err)) {
                    return;
                }
                if (err) {
                    arguments[0] = op.mainError();
                }
                callback.apply(this, arguments);
            });
            op.attempt(function() {
                original.apply(obj, args);
            });
        }).bind(obj, original);
        obj[method].options = options;
    }
};
}),
"[project]/node_modules/retry/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/retry/lib/retry.js [app-route] (ecmascript)");
}),
"[project]/node_modules/async-retry/lib/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Packages
var retrier = __turbopack_context__.r("[project]/node_modules/retry/index.js [app-route] (ecmascript)");
function retry(fn, opts) {
    function run(resolve, reject) {
        var options = opts || {};
        var op;
        // Default `randomize` to true
        if (!('randomize' in options)) {
            options.randomize = true;
        }
        op = retrier.operation(options);
        // We allow the user to abort retrying
        // this makes sense in the cases where
        // knowledge is obtained that retrying
        // would be futile (e.g.: auth errors)
        function bail(err) {
            reject(err || new Error('Aborted'));
        }
        function onError(err, num) {
            if (err.bail) {
                bail(err);
                return;
            }
            if (!op.retry(err)) {
                reject(op.mainError());
            } else if (options.onRetry) {
                options.onRetry(err, num);
            }
        }
        function runAttempt(num) {
            var val;
            try {
                val = fn(bail, num);
            } catch (err) {
                onError(err, num);
                return;
            }
            Promise.resolve(val).then(resolve).catch(function catchIt(err) {
                onError(err, num);
            });
        }
        op.attempt(runAttempt);
    }
    return new Promise(run);
}
module.exports = retry;
}),
"[project]/node_modules/uuid/dist/cjs/max.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = 'ffffffff-ffff-ffff-ffff-ffffffffffff';
}),
"[project]/node_modules/uuid/dist/cjs/nil.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = '00000000-0000-0000-0000-000000000000';
}),
"[project]/node_modules/uuid/dist/cjs/regex.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;
}),
"[project]/node_modules/uuid/dist/cjs/validate.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const regex_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/regex.js [app-route] (ecmascript)");
function validate(uuid) {
    return typeof uuid === 'string' && regex_js_1.default.test(uuid);
}
exports.default = validate;
}),
"[project]/node_modules/uuid/dist/cjs/parse.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const validate_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/validate.js [app-route] (ecmascript)");
function parse(uuid) {
    if (!(0, validate_js_1.default)(uuid)) {
        throw TypeError('Invalid UUID');
    }
    let v;
    return Uint8Array.of((v = parseInt(uuid.slice(0, 8), 16)) >>> 24, v >>> 16 & 0xff, v >>> 8 & 0xff, v & 0xff, (v = parseInt(uuid.slice(9, 13), 16)) >>> 8, v & 0xff, (v = parseInt(uuid.slice(14, 18), 16)) >>> 8, v & 0xff, (v = parseInt(uuid.slice(19, 23), 16)) >>> 8, v & 0xff, (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff, v / 0x100000000 & 0xff, v >>> 24 & 0xff, v >>> 16 & 0xff, v >>> 8 & 0xff, v & 0xff);
}
exports.default = parse;
}),
"[project]/node_modules/uuid/dist/cjs/stringify.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.unsafeStringify = void 0;
const validate_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/validate.js [app-route] (ecmascript)");
const byteToHex = [];
for(let i = 0; i < 256; ++i){
    byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
exports.unsafeStringify = unsafeStringify;
function stringify(arr, offset = 0) {
    const uuid = unsafeStringify(arr, offset);
    if (!(0, validate_js_1.default)(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}
exports.default = stringify;
}),
"[project]/node_modules/uuid/dist/cjs/rng.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const crypto_1 = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
    if (poolPtr > rnds8Pool.length - 16) {
        (0, crypto_1.randomFillSync)(rnds8Pool);
        poolPtr = 0;
    }
    return rnds8Pool.slice(poolPtr, poolPtr += 16);
}
exports.default = rng;
}),
"[project]/node_modules/uuid/dist/cjs/v1.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateV1State = void 0;
const rng_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/rng.js [app-route] (ecmascript)");
const stringify_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/stringify.js [app-route] (ecmascript)");
const _state = {};
function v1(options, buf, offset) {
    let bytes;
    const isV6 = options?._v6 ?? false;
    if (options) {
        const optionsKeys = Object.keys(options);
        if (optionsKeys.length === 1 && optionsKeys[0] === '_v6') {
            options = undefined;
        }
    }
    if (options) {
        bytes = v1Bytes(options.random ?? options.rng?.() ?? (0, rng_js_1.default)(), options.msecs, options.nsecs, options.clockseq, options.node, buf, offset);
    } else {
        const now = Date.now();
        const rnds = (0, rng_js_1.default)();
        updateV1State(_state, now, rnds);
        bytes = v1Bytes(rnds, _state.msecs, _state.nsecs, isV6 ? undefined : _state.clockseq, isV6 ? undefined : _state.node, buf, offset);
    }
    return buf ?? (0, stringify_js_1.unsafeStringify)(bytes);
}
function updateV1State(state, now, rnds) {
    state.msecs ??= -Infinity;
    state.nsecs ??= 0;
    if (now === state.msecs) {
        state.nsecs++;
        if (state.nsecs >= 10000) {
            state.node = undefined;
            state.nsecs = 0;
        }
    } else if (now > state.msecs) {
        state.nsecs = 0;
    } else if (now < state.msecs) {
        state.node = undefined;
    }
    if (!state.node) {
        state.node = rnds.slice(10, 16);
        state.node[0] |= 0x01;
        state.clockseq = (rnds[8] << 8 | rnds[9]) & 0x3fff;
    }
    state.msecs = now;
    return state;
}
exports.updateV1State = updateV1State;
function v1Bytes(rnds, msecs, nsecs, clockseq, node, buf, offset = 0) {
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    if (!buf) {
        buf = new Uint8Array(16);
        offset = 0;
    } else {
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
    }
    msecs ??= Date.now();
    nsecs ??= 0;
    clockseq ??= (rnds[8] << 8 | rnds[9]) & 0x3fff;
    node ??= rnds.slice(10, 16);
    msecs += 12219292800000;
    const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    buf[offset++] = tl >>> 24 & 0xff;
    buf[offset++] = tl >>> 16 & 0xff;
    buf[offset++] = tl >>> 8 & 0xff;
    buf[offset++] = tl & 0xff;
    const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
    buf[offset++] = tmh >>> 8 & 0xff;
    buf[offset++] = tmh & 0xff;
    buf[offset++] = tmh >>> 24 & 0xf | 0x10;
    buf[offset++] = tmh >>> 16 & 0xff;
    buf[offset++] = clockseq >>> 8 | 0x80;
    buf[offset++] = clockseq & 0xff;
    for(let n = 0; n < 6; ++n){
        buf[offset++] = node[n];
    }
    return buf;
}
exports.default = v1;
}),
"[project]/node_modules/uuid/dist/cjs/v1ToV6.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const parse_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/parse.js [app-route] (ecmascript)");
const stringify_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/stringify.js [app-route] (ecmascript)");
function v1ToV6(uuid) {
    const v1Bytes = typeof uuid === 'string' ? (0, parse_js_1.default)(uuid) : uuid;
    const v6Bytes = _v1ToV6(v1Bytes);
    return typeof uuid === 'string' ? (0, stringify_js_1.unsafeStringify)(v6Bytes) : v6Bytes;
}
exports.default = v1ToV6;
function _v1ToV6(v1Bytes) {
    return Uint8Array.of((v1Bytes[6] & 0x0f) << 4 | v1Bytes[7] >> 4 & 0x0f, (v1Bytes[7] & 0x0f) << 4 | (v1Bytes[4] & 0xf0) >> 4, (v1Bytes[4] & 0x0f) << 4 | (v1Bytes[5] & 0xf0) >> 4, (v1Bytes[5] & 0x0f) << 4 | (v1Bytes[0] & 0xf0) >> 4, (v1Bytes[0] & 0x0f) << 4 | (v1Bytes[1] & 0xf0) >> 4, (v1Bytes[1] & 0x0f) << 4 | (v1Bytes[2] & 0xf0) >> 4, 0x60 | v1Bytes[2] & 0x0f, v1Bytes[3], v1Bytes[8], v1Bytes[9], v1Bytes[10], v1Bytes[11], v1Bytes[12], v1Bytes[13], v1Bytes[14], v1Bytes[15]);
}
}),
"[project]/node_modules/uuid/dist/cjs/md5.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const crypto_1 = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
function md5(bytes) {
    if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
    } else if (typeof bytes === 'string') {
        bytes = Buffer.from(bytes, 'utf8');
    }
    return (0, crypto_1.createHash)('md5').update(bytes).digest();
}
exports.default = md5;
}),
"[project]/node_modules/uuid/dist/cjs/v35.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.URL = exports.DNS = exports.stringToBytes = void 0;
const parse_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/parse.js [app-route] (ecmascript)");
const stringify_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/stringify.js [app-route] (ecmascript)");
function stringToBytes(str) {
    str = unescape(encodeURIComponent(str));
    const bytes = new Uint8Array(str.length);
    for(let i = 0; i < str.length; ++i){
        bytes[i] = str.charCodeAt(i);
    }
    return bytes;
}
exports.stringToBytes = stringToBytes;
exports.DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
function v35(version, hash, value, namespace, buf, offset) {
    const valueBytes = typeof value === 'string' ? stringToBytes(value) : value;
    const namespaceBytes = typeof namespace === 'string' ? (0, parse_js_1.default)(namespace) : namespace;
    if (typeof namespace === 'string') {
        namespace = (0, parse_js_1.default)(namespace);
    }
    if (namespace?.length !== 16) {
        throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    }
    let bytes = new Uint8Array(16 + valueBytes.length);
    bytes.set(namespaceBytes);
    bytes.set(valueBytes, namespaceBytes.length);
    bytes = hash(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;
    if (buf) {
        offset = offset || 0;
        for(let i = 0; i < 16; ++i){
            buf[offset + i] = bytes[i];
        }
        return buf;
    }
    return (0, stringify_js_1.unsafeStringify)(bytes);
}
exports.default = v35;
}),
"[project]/node_modules/uuid/dist/cjs/v3.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.URL = exports.DNS = void 0;
const md5_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/md5.js [app-route] (ecmascript)");
const v35_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/v35.js [app-route] (ecmascript)");
var v35_js_2 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/v35.js [app-route] (ecmascript)");
Object.defineProperty(exports, "DNS", {
    enumerable: true,
    get: function() {
        return v35_js_2.DNS;
    }
});
Object.defineProperty(exports, "URL", {
    enumerable: true,
    get: function() {
        return v35_js_2.URL;
    }
});
function v3(value, namespace, buf, offset) {
    return (0, v35_js_1.default)(0x30, md5_js_1.default, value, namespace, buf, offset);
}
v3.DNS = v35_js_1.DNS;
v3.URL = v35_js_1.URL;
exports.default = v3;
}),
"[project]/node_modules/uuid/dist/cjs/native.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const crypto_1 = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
exports.default = {
    randomUUID: crypto_1.randomUUID
};
}),
"[project]/node_modules/uuid/dist/cjs/v4.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const native_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/native.js [app-route] (ecmascript)");
const rng_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/rng.js [app-route] (ecmascript)");
const stringify_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/stringify.js [app-route] (ecmascript)");
function v4(options, buf, offset) {
    if (native_js_1.default.randomUUID && !buf && !options) {
        return native_js_1.default.randomUUID();
    }
    options = options || {};
    const rnds = options.random ?? options.rng?.() ?? (0, rng_js_1.default)();
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80;
    if (buf) {
        offset = offset || 0;
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
        for(let i = 0; i < 16; ++i){
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return (0, stringify_js_1.unsafeStringify)(rnds);
}
exports.default = v4;
}),
"[project]/node_modules/uuid/dist/cjs/sha1.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const crypto_1 = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
function sha1(bytes) {
    if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
    } else if (typeof bytes === 'string') {
        bytes = Buffer.from(bytes, 'utf8');
    }
    return (0, crypto_1.createHash)('sha1').update(bytes).digest();
}
exports.default = sha1;
}),
"[project]/node_modules/uuid/dist/cjs/v5.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.URL = exports.DNS = void 0;
const sha1_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/sha1.js [app-route] (ecmascript)");
const v35_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/v35.js [app-route] (ecmascript)");
var v35_js_2 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/v35.js [app-route] (ecmascript)");
Object.defineProperty(exports, "DNS", {
    enumerable: true,
    get: function() {
        return v35_js_2.DNS;
    }
});
Object.defineProperty(exports, "URL", {
    enumerable: true,
    get: function() {
        return v35_js_2.URL;
    }
});
function v5(value, namespace, buf, offset) {
    return (0, v35_js_1.default)(0x50, sha1_js_1.default, value, namespace, buf, offset);
}
v5.DNS = v35_js_1.DNS;
v5.URL = v35_js_1.URL;
exports.default = v5;
}),
"[project]/node_modules/uuid/dist/cjs/v6.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const stringify_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/stringify.js [app-route] (ecmascript)");
const v1_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/v1.js [app-route] (ecmascript)");
const v1ToV6_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/v1ToV6.js [app-route] (ecmascript)");
function v6(options, buf, offset) {
    options ??= {};
    offset ??= 0;
    let bytes = (0, v1_js_1.default)({
        ...options,
        _v6: true
    }, new Uint8Array(16));
    bytes = (0, v1ToV6_js_1.default)(bytes);
    if (buf) {
        for(let i = 0; i < 16; i++){
            buf[offset + i] = bytes[i];
        }
        return buf;
    }
    return (0, stringify_js_1.unsafeStringify)(bytes);
}
exports.default = v6;
}),
"[project]/node_modules/uuid/dist/cjs/v6ToV1.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const parse_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/parse.js [app-route] (ecmascript)");
const stringify_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/stringify.js [app-route] (ecmascript)");
function v6ToV1(uuid) {
    const v6Bytes = typeof uuid === 'string' ? (0, parse_js_1.default)(uuid) : uuid;
    const v1Bytes = _v6ToV1(v6Bytes);
    return typeof uuid === 'string' ? (0, stringify_js_1.unsafeStringify)(v1Bytes) : v1Bytes;
}
exports.default = v6ToV1;
function _v6ToV1(v6Bytes) {
    return Uint8Array.of((v6Bytes[3] & 0x0f) << 4 | v6Bytes[4] >> 4 & 0x0f, (v6Bytes[4] & 0x0f) << 4 | (v6Bytes[5] & 0xf0) >> 4, (v6Bytes[5] & 0x0f) << 4 | v6Bytes[6] & 0x0f, v6Bytes[7], (v6Bytes[1] & 0x0f) << 4 | (v6Bytes[2] & 0xf0) >> 4, (v6Bytes[2] & 0x0f) << 4 | (v6Bytes[3] & 0xf0) >> 4, 0x10 | (v6Bytes[0] & 0xf0) >> 4, (v6Bytes[0] & 0x0f) << 4 | (v6Bytes[1] & 0xf0) >> 4, v6Bytes[8], v6Bytes[9], v6Bytes[10], v6Bytes[11], v6Bytes[12], v6Bytes[13], v6Bytes[14], v6Bytes[15]);
}
}),
"[project]/node_modules/uuid/dist/cjs/v7.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateV7State = void 0;
const rng_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/rng.js [app-route] (ecmascript)");
const stringify_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/stringify.js [app-route] (ecmascript)");
const _state = {};
function v7(options, buf, offset) {
    let bytes;
    if (options) {
        bytes = v7Bytes(options.random ?? options.rng?.() ?? (0, rng_js_1.default)(), options.msecs, options.seq, buf, offset);
    } else {
        const now = Date.now();
        const rnds = (0, rng_js_1.default)();
        updateV7State(_state, now, rnds);
        bytes = v7Bytes(rnds, _state.msecs, _state.seq, buf, offset);
    }
    return buf ?? (0, stringify_js_1.unsafeStringify)(bytes);
}
function updateV7State(state, now, rnds) {
    state.msecs ??= -Infinity;
    state.seq ??= 0;
    if (now > state.msecs) {
        state.seq = rnds[6] << 23 | rnds[7] << 16 | rnds[8] << 8 | rnds[9];
        state.msecs = now;
    } else {
        state.seq = state.seq + 1 | 0;
        if (state.seq === 0) {
            state.msecs++;
        }
    }
    return state;
}
exports.updateV7State = updateV7State;
function v7Bytes(rnds, msecs, seq, buf, offset = 0) {
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    if (!buf) {
        buf = new Uint8Array(16);
        offset = 0;
    } else {
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
    }
    msecs ??= Date.now();
    seq ??= rnds[6] * 0x7f << 24 | rnds[7] << 16 | rnds[8] << 8 | rnds[9];
    buf[offset++] = msecs / 0x10000000000 & 0xff;
    buf[offset++] = msecs / 0x100000000 & 0xff;
    buf[offset++] = msecs / 0x1000000 & 0xff;
    buf[offset++] = msecs / 0x10000 & 0xff;
    buf[offset++] = msecs / 0x100 & 0xff;
    buf[offset++] = msecs & 0xff;
    buf[offset++] = 0x70 | seq >>> 28 & 0x0f;
    buf[offset++] = seq >>> 20 & 0xff;
    buf[offset++] = 0x80 | seq >>> 14 & 0x3f;
    buf[offset++] = seq >>> 6 & 0xff;
    buf[offset++] = seq << 2 & 0xff | rnds[10] & 0x03;
    buf[offset++] = rnds[11];
    buf[offset++] = rnds[12];
    buf[offset++] = rnds[13];
    buf[offset++] = rnds[14];
    buf[offset++] = rnds[15];
    return buf;
}
exports.default = v7;
}),
"[project]/node_modules/uuid/dist/cjs/version.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const validate_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/validate.js [app-route] (ecmascript)");
function version(uuid) {
    if (!(0, validate_js_1.default)(uuid)) {
        throw TypeError('Invalid UUID');
    }
    return parseInt(uuid.slice(14, 15), 16);
}
exports.default = version;
}),
"[project]/node_modules/uuid/dist/cjs/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.version = exports.validate = exports.v7 = exports.v6ToV1 = exports.v6 = exports.v5 = exports.v4 = exports.v3 = exports.v1ToV6 = exports.v1 = exports.stringify = exports.parse = exports.NIL = exports.MAX = void 0;
var max_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/max.js [app-route] (ecmascript)");
Object.defineProperty(exports, "MAX", {
    enumerable: true,
    get: function() {
        return max_js_1.default;
    }
});
var nil_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/nil.js [app-route] (ecmascript)");
Object.defineProperty(exports, "NIL", {
    enumerable: true,
    get: function() {
        return nil_js_1.default;
    }
});
var parse_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/parse.js [app-route] (ecmascript)");
Object.defineProperty(exports, "parse", {
    enumerable: true,
    get: function() {
        return parse_js_1.default;
    }
});
var stringify_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/stringify.js [app-route] (ecmascript)");
Object.defineProperty(exports, "stringify", {
    enumerable: true,
    get: function() {
        return stringify_js_1.default;
    }
});
var v1_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/v1.js [app-route] (ecmascript)");
Object.defineProperty(exports, "v1", {
    enumerable: true,
    get: function() {
        return v1_js_1.default;
    }
});
var v1ToV6_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/v1ToV6.js [app-route] (ecmascript)");
Object.defineProperty(exports, "v1ToV6", {
    enumerable: true,
    get: function() {
        return v1ToV6_js_1.default;
    }
});
var v3_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/v3.js [app-route] (ecmascript)");
Object.defineProperty(exports, "v3", {
    enumerable: true,
    get: function() {
        return v3_js_1.default;
    }
});
var v4_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/v4.js [app-route] (ecmascript)");
Object.defineProperty(exports, "v4", {
    enumerable: true,
    get: function() {
        return v4_js_1.default;
    }
});
var v5_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/v5.js [app-route] (ecmascript)");
Object.defineProperty(exports, "v5", {
    enumerable: true,
    get: function() {
        return v5_js_1.default;
    }
});
var v6_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/v6.js [app-route] (ecmascript)");
Object.defineProperty(exports, "v6", {
    enumerable: true,
    get: function() {
        return v6_js_1.default;
    }
});
var v6ToV1_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/v6ToV1.js [app-route] (ecmascript)");
Object.defineProperty(exports, "v6ToV1", {
    enumerable: true,
    get: function() {
        return v6ToV1_js_1.default;
    }
});
var v7_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/v7.js [app-route] (ecmascript)");
Object.defineProperty(exports, "v7", {
    enumerable: true,
    get: function() {
        return v7_js_1.default;
    }
});
var validate_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/validate.js [app-route] (ecmascript)");
Object.defineProperty(exports, "validate", {
    enumerable: true,
    get: function() {
        return validate_js_1.default;
    }
});
var version_js_1 = __turbopack_context__.r("[project]/node_modules/uuid/dist/cjs/version.js [app-route] (ecmascript)");
Object.defineProperty(exports, "version", {
    enumerable: true,
    get: function() {
        return version_js_1.default;
    }
});
}),
"[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
;
;
;
}),
"[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/rng.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>rng
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate
let poolPtr = rnds8Pool.length;
function rng() {
    if (poolPtr > rnds8Pool.length - 16) {
        __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomFillSync(rnds8Pool);
        poolPtr = 0;
    }
    return rnds8Pool.slice(poolPtr, poolPtr += 16);
}
}),
"[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/regex.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
}),
"[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/validate.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$regex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/regex.js [app-route] (ecmascript)");
;
function validate(uuid) {
    return typeof uuid === 'string' && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$regex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].test(uuid);
}
const __TURBOPACK__default__export__ = validate;
}),
"[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/stringify.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/validate.js [app-route] (ecmascript)");
;
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */ const byteToHex = [];
for(let i = 0; i < 256; ++i){
    byteToHex.push((i + 0x100).toString(16).substr(1));
}
function stringify(arr, offset = 0) {
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}
const __TURBOPACK__default__export__ = stringify;
}),
"[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/v1.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$rng$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/rng.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/stringify.js [app-route] (ecmascript)"); // **`v1()` - Generate time-based UUID**
;
;
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;
let _clockseq; // Previous uuid creation time
let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
    let i = buf && offset || 0;
    const b = buf || new Array(16);
    options = options || {};
    let node = options.node || _nodeId;
    let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
    // specified.  We do this lazily to minimize issues related to insufficient
    // system entropy.  See #189
    if (node == null || clockseq == null) {
        const seedBytes = options.random || (options.rng || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$rng$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        if (node == null) {
            // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
            node = _nodeId = [
                seedBytes[0] | 0x01,
                seedBytes[1],
                seedBytes[2],
                seedBytes[3],
                seedBytes[4],
                seedBytes[5]
            ];
        }
        if (clockseq == null) {
            // Per 4.2.2, randomize (14 bit) clockseq
            clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
        }
    } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)
    const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq === undefined) {
        clockseq = clockseq + 1 & 0x3fff;
    } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
        nsecs = 0;
    } // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    }
    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000; // `time_low`
    const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff; // `time_mid`
    const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff; // `time_high_and_version`
    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
    b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`
    b[i++] = clockseq & 0xff; // `node`
    for(let n = 0; n < 6; ++n){
        b[i + n] = node[n];
    }
    return buf || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(b);
}
const __TURBOPACK__default__export__ = v1;
}),
"[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/parse.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/validate.js [app-route] (ecmascript)");
;
function parse(uuid) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(uuid)) {
        throw TypeError('Invalid UUID');
    }
    let v;
    const arr = new Uint8Array(16); // Parse ########-....-....-....-............
    arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
    arr[1] = v >>> 16 & 0xff;
    arr[2] = v >>> 8 & 0xff;
    arr[3] = v & 0xff; // Parse ........-####-....-....-............
    arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
    arr[5] = v & 0xff; // Parse ........-....-####-....-............
    arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
    arr[7] = v & 0xff; // Parse ........-....-....-####-............
    arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
    arr[9] = v & 0xff; // Parse ........-....-....-....-############
    // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)
    arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
    arr[11] = v / 0x100000000 & 0xff;
    arr[12] = v >>> 24 & 0xff;
    arr[13] = v >>> 16 & 0xff;
    arr[14] = v >>> 8 & 0xff;
    arr[15] = v & 0xff;
    return arr;
}
const __TURBOPACK__default__export__ = parse;
}),
"[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/v35.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DNS",
    ()=>DNS,
    "URL",
    ()=>URL,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/stringify.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/parse.js [app-route] (ecmascript)");
;
;
function stringToBytes(str) {
    str = unescape(encodeURIComponent(str)); // UTF8 escape
    const bytes = [];
    for(let i = 0; i < str.length; ++i){
        bytes.push(str.charCodeAt(i));
    }
    return bytes;
}
const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
function __TURBOPACK__default__export__(name, version, hashfunc) {
    function generateUUID(value, namespace, buf, offset) {
        if (typeof value === 'string') {
            value = stringToBytes(value);
        }
        if (typeof namespace === 'string') {
            namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(namespace);
        }
        if (namespace.length !== 16) {
            throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
        } // Compute hash of namespace and value, Per 4.3
        // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
        // hashfunc([...namespace, ... value])`
        let bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = bytes[6] & 0x0f | version;
        bytes[8] = bytes[8] & 0x3f | 0x80;
        if (buf) {
            offset = offset || 0;
            for(let i = 0; i < 16; ++i){
                buf[offset + i] = bytes[i];
            }
            return buf;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(bytes);
    } // Function#name is not settable on some platforms (#270)
    try {
        generateUUID.name = name; // eslint-disable-next-line no-empty
    } catch (err) {} // For CommonJS default export support
    generateUUID.DNS = DNS;
    generateUUID.URL = URL;
    return generateUUID;
}
}),
"[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/md5.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
function md5(bytes) {
    if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
    } else if (typeof bytes === 'string') {
        bytes = Buffer.from(bytes, 'utf8');
    }
    return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash('md5').update(bytes).digest();
}
const __TURBOPACK__default__export__ = md5;
}),
"[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/v3.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v35$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/v35.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$md5$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/md5.js [app-route] (ecmascript)");
;
;
const v3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v35$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])('v3', 0x30, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$md5$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
const __TURBOPACK__default__export__ = v3;
}),
"[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/v4.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$rng$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/rng.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/stringify.js [app-route] (ecmascript)");
;
;
function v4(options, buf, offset) {
    options = options || {};
    const rnds = options.random || (options.rng || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$rng$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided
    if (buf) {
        offset = offset || 0;
        for(let i = 0; i < 16; ++i){
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(rnds);
}
const __TURBOPACK__default__export__ = v4;
}),
"[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/sha1.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
function sha1(bytes) {
    if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
    } else if (typeof bytes === 'string') {
        bytes = Buffer.from(bytes, 'utf8');
    }
    return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash('sha1').update(bytes).digest();
}
const __TURBOPACK__default__export__ = sha1;
}),
"[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/v5.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v35$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/v35.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$sha1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/sha1.js [app-route] (ecmascript)");
;
;
const v5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v35$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])('v5', 0x50, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$sha1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
const __TURBOPACK__default__export__ = v5;
}),
"[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/nil.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = '00000000-0000-0000-0000-000000000000';
}),
"[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/version.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/validate.js [app-route] (ecmascript)");
;
function version(uuid) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(uuid)) {
        throw TypeError('Invalid UUID');
    }
    return parseInt(uuid.substr(14, 1), 16);
}
const __TURBOPACK__default__export__ = version;
}),
"[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NIL",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$nil$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    "parse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    "stringify",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    "v1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    "v3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v3$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    "v4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    "v5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v5$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    "validate",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    "version",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$version$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/v1.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v3$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/v3.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/v4.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v5$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/v5.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$nil$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/nil.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$version$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/version.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/validate.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/stringify.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/parse.js [app-route] (ecmascript)");
}),
"[project]/node_modules/graphql-tag/lib/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "disableExperimentalFragmentVariables",
    ()=>disableExperimentalFragmentVariables,
    "disableFragmentWarnings",
    ()=>disableFragmentWarnings,
    "enableExperimentalFragmentVariables",
    ()=>enableExperimentalFragmentVariables,
    "gql",
    ()=>gql,
    "resetCaches",
    ()=>resetCaches
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$language$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/graphql/language/parser.mjs [app-route] (ecmascript)");
;
;
var docCache = new Map();
var fragmentSourceMap = new Map();
var printFragmentWarnings = true;
var experimentalFragmentVariables = false;
function normalize(string) {
    return string.replace(/[\s,]+/g, ' ').trim();
}
function cacheKeyFromLoc(loc) {
    return normalize(loc.source.body.substring(loc.start, loc.end));
}
function processFragments(ast) {
    var seenKeys = new Set();
    var definitions = [];
    ast.definitions.forEach(function(fragmentDefinition) {
        if (fragmentDefinition.kind === 'FragmentDefinition') {
            var fragmentName = fragmentDefinition.name.value;
            var sourceKey = cacheKeyFromLoc(fragmentDefinition.loc);
            var sourceKeySet = fragmentSourceMap.get(fragmentName);
            if (sourceKeySet && !sourceKeySet.has(sourceKey)) {
                if (printFragmentWarnings) {
                    console.warn("Warning: fragment with name " + fragmentName + " already exists.\n" + "graphql-tag enforces all fragment names across your application to be unique; read more about\n" + "this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names");
                }
            } else if (!sourceKeySet) {
                fragmentSourceMap.set(fragmentName, sourceKeySet = new Set);
            }
            sourceKeySet.add(sourceKey);
            if (!seenKeys.has(sourceKey)) {
                seenKeys.add(sourceKey);
                definitions.push(fragmentDefinition);
            }
        } else {
            definitions.push(fragmentDefinition);
        }
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__assign"])({}, ast), {
        definitions: definitions
    });
}
function stripLoc(doc) {
    var workSet = new Set(doc.definitions);
    workSet.forEach(function(node) {
        if (node.loc) delete node.loc;
        Object.keys(node).forEach(function(key) {
            var value = node[key];
            if (value && typeof value === 'object') {
                workSet.add(value);
            }
        });
    });
    var loc = doc.loc;
    if (loc) {
        delete loc.startToken;
        delete loc.endToken;
    }
    return doc;
}
function parseDocument(source) {
    var cacheKey = normalize(source);
    if (!docCache.has(cacheKey)) {
        var parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2f$language$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parse"])(source, {
            experimentalFragmentVariables: experimentalFragmentVariables,
            allowLegacyFragmentVariables: experimentalFragmentVariables
        });
        if (!parsed || parsed.kind !== 'Document') {
            throw new Error('Not a valid GraphQL document.');
        }
        docCache.set(cacheKey, stripLoc(processFragments(parsed)));
    }
    return docCache.get(cacheKey);
}
function gql(literals) {
    var args = [];
    for(var _i = 1; _i < arguments.length; _i++){
        args[_i - 1] = arguments[_i];
    }
    if (typeof literals === 'string') {
        literals = [
            literals
        ];
    }
    var result = literals[0];
    args.forEach(function(arg, i) {
        if (arg && arg.kind === 'Document') {
            result += arg.loc.source.body;
        } else {
            result += arg;
        }
        result += literals[i + 1];
    });
    return parseDocument(result);
}
function resetCaches() {
    docCache.clear();
    fragmentSourceMap.clear();
}
function disableFragmentWarnings() {
    printFragmentWarnings = false;
}
function enableExperimentalFragmentVariables() {
    experimentalFragmentVariables = true;
}
function disableExperimentalFragmentVariables() {
    experimentalFragmentVariables = false;
}
var extras = {
    gql: gql,
    resetCaches: resetCaches,
    disableFragmentWarnings: disableFragmentWarnings,
    enableExperimentalFragmentVariables: enableExperimentalFragmentVariables,
    disableExperimentalFragmentVariables: disableExperimentalFragmentVariables
};
(function(gql_1) {
    gql_1.gql = extras.gql, gql_1.resetCaches = extras.resetCaches, gql_1.disableFragmentWarnings = extras.disableFragmentWarnings, gql_1.enableExperimentalFragmentVariables = extras.enableExperimentalFragmentVariables, gql_1.disableExperimentalFragmentVariables = extras.disableExperimentalFragmentVariables;
})(gql || (gql = {}));
gql["default"] = gql;
const __TURBOPACK__default__export__ = gql;
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/graphql-subscriptions/dist/pubsub-async-iterable-iterator.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__generator || function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PubSubAsyncIterableIterator = void 0;
var PubSubAsyncIterableIterator = function() {
    function PubSubAsyncIterableIterator(pubsub, eventNames) {
        this.pubsub = pubsub;
        this.pullQueue = [];
        this.pushQueue = [];
        this.running = true;
        this.allSubscribed = null;
        this.eventsArray = typeof eventNames === 'string' ? [
            eventNames
        ] : eventNames;
    }
    PubSubAsyncIterableIterator.prototype.next = function() {
        return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        if (!!this.allSubscribed) return [
                            3,
                            2
                        ];
                        return [
                            4,
                            this.allSubscribed = this.subscribeAll()
                        ];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        return [
                            2,
                            this.pullValue()
                        ];
                }
            });
        });
    };
    PubSubAsyncIterableIterator.prototype.return = function() {
        return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        return [
                            4,
                            this.emptyQueue()
                        ];
                    case 1:
                        _a.sent();
                        return [
                            2,
                            {
                                value: undefined,
                                done: true
                            }
                        ];
                }
            });
        });
    };
    PubSubAsyncIterableIterator.prototype.throw = function(error) {
        return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        return [
                            4,
                            this.emptyQueue()
                        ];
                    case 1:
                        _a.sent();
                        return [
                            2,
                            Promise.reject(error)
                        ];
                }
            });
        });
    };
    PubSubAsyncIterableIterator.prototype[Symbol.asyncIterator] = function() {
        return this;
    };
    PubSubAsyncIterableIterator.prototype.pushValue = function(event) {
        return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        return [
                            4,
                            this.allSubscribed
                        ];
                    case 1:
                        _a.sent();
                        if (this.pullQueue.length !== 0) {
                            this.pullQueue.shift()(this.running ? {
                                value: event,
                                done: false
                            } : {
                                value: undefined,
                                done: true
                            });
                        } else {
                            this.pushQueue.push(event);
                        }
                        return [
                            2
                        ];
                }
            });
        });
    };
    PubSubAsyncIterableIterator.prototype.pullValue = function() {
        var _this = this;
        return new Promise(function(resolve) {
            if (_this.pushQueue.length !== 0) {
                resolve(_this.running ? {
                    value: _this.pushQueue.shift(),
                    done: false
                } : {
                    value: undefined,
                    done: true
                });
            } else {
                _this.pullQueue.push(resolve);
            }
        });
    };
    PubSubAsyncIterableIterator.prototype.emptyQueue = function() {
        return __awaiter(this, void 0, void 0, function() {
            var subscriptionIds;
            return __generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        if (!this.running) return [
                            3,
                            2
                        ];
                        this.running = false;
                        this.pullQueue.forEach(function(resolve) {
                            return resolve({
                                value: undefined,
                                done: true
                            });
                        });
                        this.pullQueue.length = 0;
                        this.pushQueue.length = 0;
                        return [
                            4,
                            this.allSubscribed
                        ];
                    case 1:
                        subscriptionIds = _a.sent();
                        if (subscriptionIds) {
                            this.unsubscribeAll(subscriptionIds);
                        }
                        _a.label = 2;
                    case 2:
                        return [
                            2
                        ];
                }
            });
        });
    };
    PubSubAsyncIterableIterator.prototype.subscribeAll = function() {
        var _this = this;
        return Promise.all(this.eventsArray.map(function(eventName) {
            return _this.pubsub.subscribe(eventName, _this.pushValue.bind(_this), {});
        }));
    };
    PubSubAsyncIterableIterator.prototype.unsubscribeAll = function(subscriptionIds) {
        for(var _i = 0, subscriptionIds_1 = subscriptionIds; _i < subscriptionIds_1.length; _i++){
            var subscriptionId = subscriptionIds_1[_i];
            this.pubsub.unsubscribe(subscriptionId);
        }
    };
    return PubSubAsyncIterableIterator;
}();
exports.PubSubAsyncIterableIterator = PubSubAsyncIterableIterator; //# sourceMappingURL=pubsub-async-iterable-iterator.js.map
}),
"[project]/node_modules/graphql-subscriptions/dist/pubsub-engine.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PubSubEngine = void 0;
var pubsub_async_iterable_iterator_1 = __turbopack_context__.r("[project]/node_modules/graphql-subscriptions/dist/pubsub-async-iterable-iterator.js [app-route] (ecmascript)");
var PubSubEngine = function() {
    function PubSubEngine() {}
    PubSubEngine.prototype.asyncIterableIterator = function(triggers) {
        return new pubsub_async_iterable_iterator_1.PubSubAsyncIterableIterator(this, triggers);
    };
    return PubSubEngine;
}();
exports.PubSubEngine = PubSubEngine; //# sourceMappingURL=pubsub-engine.js.map
}),
"[project]/node_modules/graphql-subscriptions/dist/pubsub.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __extends = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PubSub = void 0;
var events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
var pubsub_engine_1 = __turbopack_context__.r("[project]/node_modules/graphql-subscriptions/dist/pubsub-engine.js [app-route] (ecmascript)");
var PubSub = function(_super) {
    __extends(PubSub, _super);
    function PubSub(options) {
        if (options === void 0) {
            options = {};
        }
        var _this = _super.call(this) || this;
        _this.ee = options.eventEmitter || new events_1.EventEmitter();
        _this.subscriptions = {};
        _this.subIdCounter = 0;
        return _this;
    }
    PubSub.prototype.publish = function(triggerName, payload) {
        this.ee.emit(triggerName, payload);
        return Promise.resolve();
    };
    PubSub.prototype.subscribe = function(triggerName, onMessage) {
        this.ee.addListener(triggerName, onMessage);
        this.subIdCounter = this.subIdCounter + 1;
        this.subscriptions[this.subIdCounter] = [
            triggerName,
            onMessage
        ];
        return Promise.resolve(this.subIdCounter);
    };
    PubSub.prototype.unsubscribe = function(subId) {
        var _a = this.subscriptions[subId], triggerName = _a[0], onMessage = _a[1];
        delete this.subscriptions[subId];
        this.ee.removeListener(triggerName, onMessage);
    };
    return PubSub;
}(pubsub_engine_1.PubSubEngine);
exports.PubSub = PubSub; //# sourceMappingURL=pubsub.js.map
}),
"[project]/node_modules/graphql-subscriptions/dist/with-filter.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__generator || function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.withFilter = void 0;
function withFilter(asyncIteratorFn, filterFn) {
    var _this = this;
    return function(rootValue, args, context, info) {
        return __awaiter(_this, void 0, void 0, function() {
            var asyncIterator, getNextPromise, asyncIterator2;
            var _a;
            return __generator(this, function(_b) {
                switch(_b.label){
                    case 0:
                        return [
                            4,
                            asyncIteratorFn(rootValue, args, context, info)
                        ];
                    case 1:
                        asyncIterator = _b.sent();
                        getNextPromise = function() {
                            return new Promise(function(resolve, reject) {
                                var inner = function() {
                                    asyncIterator.next().then(function(payload) {
                                        if (payload.done === true) {
                                            resolve(payload);
                                            return;
                                        }
                                        Promise.resolve(filterFn(payload.value, args, context, info)).catch(function() {
                                            return false;
                                        }).then(function(filterResult) {
                                            if (filterResult === true) {
                                                resolve(payload);
                                                return;
                                            }
                                            inner();
                                            return;
                                        });
                                    }).catch(function(err) {
                                        reject(err);
                                        return;
                                    });
                                };
                                inner();
                            });
                        };
                        asyncIterator2 = (_a = {
                            next: function() {
                                return getNextPromise();
                            },
                            return: function() {
                                return asyncIterator.return();
                            },
                            throw: function(error) {
                                return asyncIterator.throw(error);
                            }
                        }, _a[Symbol.asyncIterator] = function() {
                            return this;
                        }, _a);
                        return [
                            2,
                            asyncIterator2
                        ];
                }
            });
        });
    };
}
exports.withFilter = withFilter;
; //# sourceMappingURL=with-filter.js.map
}),
"[project]/node_modules/graphql-subscriptions/dist/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.withFilter = exports.PubSub = exports.PubSubEngine = void 0;
var pubsub_engine_1 = __turbopack_context__.r("[project]/node_modules/graphql-subscriptions/dist/pubsub-engine.js [app-route] (ecmascript)");
Object.defineProperty(exports, "PubSubEngine", {
    enumerable: true,
    get: function() {
        return pubsub_engine_1.PubSubEngine;
    }
});
var pubsub_1 = __turbopack_context__.r("[project]/node_modules/graphql-subscriptions/dist/pubsub.js [app-route] (ecmascript)");
Object.defineProperty(exports, "PubSub", {
    enumerable: true,
    get: function() {
        return pubsub_1.PubSub;
    }
});
var with_filter_1 = __turbopack_context__.r("[project]/node_modules/graphql-subscriptions/dist/with-filter.js [app-route] (ecmascript)");
Object.defineProperty(exports, "withFilter", {
    enumerable: true,
    get: function() {
        return with_filter_1.withFilter;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        "default": e
    };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@panva/hkdf/dist/node/cjs/runtime/fallback.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const crypto_1 = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
exports.default = (digest, ikm, salt, info, keylen)=>{
    const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;
    const prk = (0, crypto_1.createHmac)(digest, salt.byteLength ? salt : new Uint8Array(hashlen)).update(ikm).digest();
    const N = Math.ceil(keylen / hashlen);
    const T = new Uint8Array(hashlen * N + info.byteLength + 1);
    let prev = 0;
    let start = 0;
    for(let c = 1; c <= N; c++){
        T.set(info, start);
        T[start + info.byteLength] = c;
        T.set((0, crypto_1.createHmac)(digest, prk).update(T.subarray(prev, start + info.byteLength + 1)).digest(), start);
        prev = start;
        start += hashlen;
    }
    return T.slice(0, keylen);
};
}),
"[project]/node_modules/@panva/hkdf/dist/node/cjs/runtime/hkdf.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
const fallback_js_1 = __turbopack_context__.r("[project]/node_modules/@panva/hkdf/dist/node/cjs/runtime/fallback.js [app-route] (ecmascript)");
let hkdf;
if (typeof crypto.hkdf === 'function' && !process.versions.electron) {
    hkdf = async (...args)=>new Promise((resolve, reject)=>{
            crypto.hkdf(...args, (err, arrayBuffer)=>{
                if (err) reject(err);
                else resolve(new Uint8Array(arrayBuffer));
            });
        });
}
exports.default = async (digest, ikm, salt, info, keylen)=>(hkdf || fallback_js_1.default)(digest, ikm, salt, info, keylen);
}),
"[project]/node_modules/@panva/hkdf/dist/node/cjs/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exports.hkdf = void 0;
const hkdf_js_1 = __turbopack_context__.r("[project]/node_modules/@panva/hkdf/dist/node/cjs/runtime/hkdf.js [app-route] (ecmascript)");
function normalizeDigest(digest) {
    switch(digest){
        case 'sha256':
        case 'sha384':
        case 'sha512':
        case 'sha1':
            return digest;
        default:
            throw new TypeError('unsupported "digest" value');
    }
}
function normalizeUint8Array(input, label) {
    if (typeof input === 'string') return new TextEncoder().encode(input);
    if (!(input instanceof Uint8Array)) throw new TypeError(`"${label}"" must be an instance of Uint8Array or a string`);
    return input;
}
function normalizeIkm(input) {
    const ikm = normalizeUint8Array(input, 'ikm');
    if (!ikm.byteLength) throw new TypeError(`"ikm" must be at least one byte in length`);
    return ikm;
}
function normalizeInfo(input) {
    const info = normalizeUint8Array(input, 'info');
    if (info.byteLength > 1024) {
        throw TypeError('"info" must not contain more than 1024 bytes');
    }
    return info;
}
function normalizeKeylen(input, digest) {
    if (typeof input !== 'number' || !Number.isInteger(input) || input < 1) {
        throw new TypeError('"keylen" must be a positive integer');
    }
    const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;
    if (input > 255 * hashlen) {
        throw new TypeError('"keylen" too large');
    }
    return input;
}
async function hkdf(digest, ikm, salt, info, keylen) {
    return (0, hkdf_js_1.default)(normalizeDigest(digest), normalizeIkm(ikm), normalizeUint8Array(salt, 'salt'), normalizeInfo(info), normalizeKeylen(keylen, digest));
}
exports.hkdf = hkdf;
exports.default = hkdf;
}),
"[project]/node_modules/next-auth/core/lib/cookie.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SessionStore = void 0;
exports.defaultCookies = defaultCookies;
function _classPrivateMethodInitSpec(e, a) {
    _checkPrivateRedeclaration(e, a), a.add(e);
}
function _classPrivateFieldInitSpec(e, t, a) {
    _checkPrivateRedeclaration(e, t), t.set(e, a);
}
function _checkPrivateRedeclaration(e, t) {
    if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function _classPrivateFieldGet(s, a) {
    return s.get(_assertClassBrand(s, a));
}
function _classPrivateFieldSet(s, a, r) {
    return s.set(_assertClassBrand(s, a), r), r;
}
function _assertClassBrand(e, t, n) {
    if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
    throw new TypeError("Private element is not present on this object");
}
const ALLOWED_COOKIE_SIZE = 4096;
const ESTIMATED_EMPTY_COOKIE_SIZE = 163;
const CHUNK_SIZE = ALLOWED_COOKIE_SIZE - ESTIMATED_EMPTY_COOKIE_SIZE;
function defaultCookies(useSecureCookies) {
    const cookiePrefix = useSecureCookies ? "__Secure-" : "";
    return {
        sessionToken: {
            name: `${cookiePrefix}next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies
            }
        },
        callbackUrl: {
            name: `${cookiePrefix}next-auth.callback-url`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies
            }
        },
        csrfToken: {
            name: `${useSecureCookies ? "__Host-" : ""}next-auth.csrf-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies
            }
        },
        pkceCodeVerifier: {
            name: `${cookiePrefix}next-auth.pkce.code_verifier`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                maxAge: 60 * 15
            }
        },
        state: {
            name: `${cookiePrefix}next-auth.state`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                maxAge: 60 * 15
            }
        },
        nonce: {
            name: `${cookiePrefix}next-auth.nonce`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies
            }
        }
    };
}
var _chunks = new WeakMap();
var _option = new WeakMap();
var _logger = new WeakMap();
var _SessionStore_brand = new WeakSet();
class SessionStore {
    constructor(option, req, logger){
        _classPrivateMethodInitSpec(this, _SessionStore_brand);
        _classPrivateFieldInitSpec(this, _chunks, {});
        _classPrivateFieldInitSpec(this, _option, void 0);
        _classPrivateFieldInitSpec(this, _logger, void 0);
        _classPrivateFieldSet(_logger, this, logger);
        _classPrivateFieldSet(_option, this, option);
        const { cookies: _cookies } = req;
        const { name: cookieName } = option;
        if (typeof (_cookies === null || _cookies === void 0 ? void 0 : _cookies.getAll) === "function") {
            for (const { name, value } of _cookies.getAll()){
                if (name.startsWith(cookieName)) {
                    _classPrivateFieldGet(_chunks, this)[name] = value;
                }
            }
        } else if (_cookies instanceof Map) {
            for (const name of _cookies.keys()){
                if (name.startsWith(cookieName)) _classPrivateFieldGet(_chunks, this)[name] = _cookies.get(name);
            }
        } else {
            for(const name in _cookies){
                if (name.startsWith(cookieName)) _classPrivateFieldGet(_chunks, this)[name] = _cookies[name];
            }
        }
    }
    get value() {
        const sortedKeys = Object.keys(_classPrivateFieldGet(_chunks, this)).sort((a, b)=>{
            var _a$split$pop, _b$split$pop;
            const aSuffix = parseInt((_a$split$pop = a.split(".").pop()) !== null && _a$split$pop !== void 0 ? _a$split$pop : "0");
            const bSuffix = parseInt((_b$split$pop = b.split(".").pop()) !== null && _b$split$pop !== void 0 ? _b$split$pop : "0");
            return aSuffix - bSuffix;
        });
        return sortedKeys.map((key)=>_classPrivateFieldGet(_chunks, this)[key]).join("");
    }
    chunk(value, options) {
        const cookies = _assertClassBrand(_SessionStore_brand, this, _clean).call(this);
        const chunked = _assertClassBrand(_SessionStore_brand, this, _chunk).call(this, {
            name: _classPrivateFieldGet(_option, this).name,
            value,
            options: {
                ..._classPrivateFieldGet(_option, this).options,
                ...options
            }
        });
        for (const chunk of chunked){
            cookies[chunk.name] = chunk;
        }
        return Object.values(cookies);
    }
    clean() {
        return Object.values(_assertClassBrand(_SessionStore_brand, this, _clean).call(this));
    }
}
exports.SessionStore = SessionStore;
function _chunk(cookie) {
    const chunkCount = Math.ceil(cookie.value.length / CHUNK_SIZE);
    if (chunkCount === 1) {
        _classPrivateFieldGet(_chunks, this)[cookie.name] = cookie.value;
        return [
            cookie
        ];
    }
    const cookies = [];
    for(let i = 0; i < chunkCount; i++){
        const name = `${cookie.name}.${i}`;
        const value = cookie.value.substr(i * CHUNK_SIZE, CHUNK_SIZE);
        cookies.push({
            ...cookie,
            name,
            value
        });
        _classPrivateFieldGet(_chunks, this)[name] = value;
    }
    _classPrivateFieldGet(_logger, this).debug("CHUNKING_SESSION_COOKIE", {
        message: `Session cookie exceeds allowed ${ALLOWED_COOKIE_SIZE} bytes.`,
        emptyCookieSize: ESTIMATED_EMPTY_COOKIE_SIZE,
        valueSize: cookie.value.length,
        chunks: cookies.map((c)=>c.value.length + ESTIMATED_EMPTY_COOKIE_SIZE)
    });
    return cookies;
}
function _clean() {
    const cleanedChunks = {};
    for(const name in _classPrivateFieldGet(_chunks, this)){
        var _classPrivateFieldGet2;
        (_classPrivateFieldGet2 = _classPrivateFieldGet(_chunks, this)) === null || _classPrivateFieldGet2 === void 0 || delete _classPrivateFieldGet2[name];
        cleanedChunks[name] = {
            name,
            value: "",
            options: {
                ..._classPrivateFieldGet(_option, this).options,
                maxAge: 0
            }
        };
    }
    return cleanedChunks;
}
}),
"[project]/node_modules/next-auth/jwt/types.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/node_modules/next-auth/jwt/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-route] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _exportNames = {
    encode: true,
    decode: true,
    getToken: true
};
exports.decode = decode;
exports.encode = encode;
exports.getToken = getToken;
var _jose = __turbopack_context__.r("[project]/node_modules/jose/dist/node/cjs/index.js [app-route] (ecmascript)");
var _hkdf = _interopRequireDefault(__turbopack_context__.r("[project]/node_modules/@panva/hkdf/dist/node/cjs/index.js [app-route] (ecmascript)"));
var _uuid = __turbopack_context__.r("[project]/node_modules/next-auth/node_modules/uuid/dist/esm-node/index.js [app-route] (ecmascript)");
var _cookie = __turbopack_context__.r("[project]/node_modules/next-auth/core/lib/cookie.js [app-route] (ecmascript)");
var _types = __turbopack_context__.r("[project]/node_modules/next-auth/jwt/types.js [app-route] (ecmascript)");
Object.keys(_types).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _types[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _types[key];
        }
    });
});
const DEFAULT_MAX_AGE = 30 * 24 * 60 * 60;
const now = ()=>Date.now() / 1000 | 0;
async function encode(params) {
    const { token = {}, secret, maxAge = DEFAULT_MAX_AGE, salt = "" } = params;
    const encryptionSecret = await getDerivedEncryptionKey(secret, salt);
    return await new _jose.EncryptJWT(token).setProtectedHeader({
        alg: "dir",
        enc: "A256GCM"
    }).setIssuedAt().setExpirationTime(now() + maxAge).setJti((0, _uuid.v4)()).encrypt(encryptionSecret);
}
async function decode(params) {
    const { token, secret, salt = "" } = params;
    if (!token) return null;
    const encryptionSecret = await getDerivedEncryptionKey(secret, salt);
    const { payload } = await (0, _jose.jwtDecrypt)(token, encryptionSecret, {
        clockTolerance: 15
    });
    return payload;
}
async function getToken(params) {
    var _process$env$NEXTAUTH, _process$env$NEXTAUTH2, _process$env$NEXTAUTH3, _req$headers;
    const { req, secureCookie = (_process$env$NEXTAUTH = (_process$env$NEXTAUTH2 = process.env.NEXTAUTH_URL) === null || _process$env$NEXTAUTH2 === void 0 ? void 0 : _process$env$NEXTAUTH2.startsWith("https://")) !== null && _process$env$NEXTAUTH !== void 0 ? _process$env$NEXTAUTH : !!process.env.VERCEL, cookieName = secureCookie ? "__Secure-next-auth.session-token" : "next-auth.session-token", raw, decode: _decode = decode, logger = console, secret = (_process$env$NEXTAUTH3 = process.env.NEXTAUTH_SECRET) !== null && _process$env$NEXTAUTH3 !== void 0 ? _process$env$NEXTAUTH3 : process.env.AUTH_SECRET } = params;
    if (!req) throw new Error("Must pass `req` to JWT getToken()");
    const sessionStore = new _cookie.SessionStore({
        name: cookieName,
        options: {
            secure: secureCookie
        }
    }, {
        cookies: req.cookies,
        headers: req.headers
    }, logger);
    let token = sessionStore.value;
    const authorizationHeader = req.headers instanceof Headers ? req.headers.get("authorization") : (_req$headers = req.headers) === null || _req$headers === void 0 ? void 0 : _req$headers.authorization;
    if (!token && (authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(" ")[0]) === "Bearer") {
        const urlEncodedToken = authorizationHeader.split(" ")[1];
        token = decodeURIComponent(urlEncodedToken);
    }
    if (!token) return null;
    if (raw) return token;
    try {
        return await _decode({
            token,
            secret
        });
    } catch (_unused) {
        return null;
    }
}
async function getDerivedEncryptionKey(keyMaterial, salt) {
    return await (0, _hkdf.default)("sha256", keyMaterial, salt, `NextAuth.js Generated Encryption Key${salt ? ` (${salt})` : ""}`, 32);
}
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client-2c3a283f134fdcb6", () => require("@prisma/client-2c3a283f134fdcb6"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__dc3300f3._.js.map