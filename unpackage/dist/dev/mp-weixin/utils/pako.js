"use strict";
/*! pako 2.0.4 https://github.com/nodeca/pako @license (MIT AND Zlib) */
var exp = {};
!function(e, t) {
  typeof exports == "object" && typeof module != "undefined" ? t(exports) : typeof define == "function" && define.amd ? define(["exports"], t) : t((e = typeof globalThis != "undefined" ? globalThis : e || self).pako = {});
}(globalThis, function(e) {
  var t = (e2, t2, i2, n2) => {
    let a2 = 65535 & e2 | 0, r2 = e2 >>> 16 & 65535 | 0, o2 = 0;
    for (; i2 !== 0; ) {
      o2 = i2 > 2e3 ? 2e3 : i2, i2 -= o2;
      do {
        a2 = a2 + t2[n2++] | 0, r2 = r2 + a2 | 0;
      } while (--o2);
      a2 %= 65521, r2 %= 65521;
    }
    return a2 | r2 << 16 | 0;
  };
  const i = new Uint32Array((() => {
    let e2, t2 = [];
    for (var i2 = 0; i2 < 256; i2++) {
      e2 = i2;
      for (var n2 = 0; n2 < 8; n2++)
        e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
      t2[i2] = e2;
    }
    return t2;
  })());
  var n = (e2, t2, n2, a2) => {
    const r2 = i, o2 = a2 + n2;
    e2 ^= -1;
    for (let i2 = a2; i2 < o2; i2++)
      e2 = e2 >>> 8 ^ r2[255 & (e2 ^ t2[i2])];
    return -1 ^ e2;
  };
  var a = function(e2, t2) {
    let i2, n2, a2, r2, o2, s2, l2, d2, f2, c2, h2, u2, w2, b2, k2, m2, _2, g2, p2, v2, x2, y2, E2, R2;
    const A2 = e2.state;
    i2 = e2.next_in, E2 = e2.input, n2 = i2 + (e2.avail_in - 5), a2 = e2.next_out, R2 = e2.output, r2 = a2 - (t2 - e2.avail_out), o2 = a2 + (e2.avail_out - 257), s2 = A2.dmax, l2 = A2.wsize, d2 = A2.whave, f2 = A2.wnext, c2 = A2.window, h2 = A2.hold, u2 = A2.bits, w2 = A2.lencode, b2 = A2.distcode, k2 = (1 << A2.lenbits) - 1, m2 = (1 << A2.distbits) - 1;
    e:
      do {
        u2 < 15 && (h2 += E2[i2++] << u2, u2 += 8, h2 += E2[i2++] << u2, u2 += 8), _2 = w2[h2 & k2];
        t:
          for (; ; ) {
            if (g2 = _2 >>> 24, h2 >>>= g2, u2 -= g2, g2 = _2 >>> 16 & 255, g2 === 0)
              R2[a2++] = 65535 & _2;
            else {
              if (!(16 & g2)) {
                if ((64 & g2) == 0) {
                  _2 = w2[(65535 & _2) + (h2 & (1 << g2) - 1)];
                  continue t;
                }
                if (32 & g2) {
                  A2.mode = 12;
                  break e;
                }
                e2.msg = "invalid literal/length code", A2.mode = 30;
                break e;
              }
              p2 = 65535 & _2, g2 &= 15, g2 && (u2 < g2 && (h2 += E2[i2++] << u2, u2 += 8), p2 += h2 & (1 << g2) - 1, h2 >>>= g2, u2 -= g2), u2 < 15 && (h2 += E2[i2++] << u2, u2 += 8, h2 += E2[i2++] << u2, u2 += 8), _2 = b2[h2 & m2];
              i:
                for (; ; ) {
                  if (g2 = _2 >>> 24, h2 >>>= g2, u2 -= g2, g2 = _2 >>> 16 & 255, !(16 & g2)) {
                    if ((64 & g2) == 0) {
                      _2 = b2[(65535 & _2) + (h2 & (1 << g2) - 1)];
                      continue i;
                    }
                    e2.msg = "invalid distance code", A2.mode = 30;
                    break e;
                  }
                  if (v2 = 65535 & _2, g2 &= 15, u2 < g2 && (h2 += E2[i2++] << u2, u2 += 8, u2 < g2 && (h2 += E2[i2++] << u2, u2 += 8)), v2 += h2 & (1 << g2) - 1, v2 > s2) {
                    e2.msg = "invalid distance too far back", A2.mode = 30;
                    break e;
                  }
                  if (h2 >>>= g2, u2 -= g2, g2 = a2 - r2, v2 > g2) {
                    if (g2 = v2 - g2, g2 > d2 && A2.sane) {
                      e2.msg = "invalid distance too far back", A2.mode = 30;
                      break e;
                    }
                    if (x2 = 0, y2 = c2, f2 === 0) {
                      if (x2 += l2 - g2, g2 < p2) {
                        p2 -= g2;
                        do {
                          R2[a2++] = c2[x2++];
                        } while (--g2);
                        x2 = a2 - v2, y2 = R2;
                      }
                    } else if (f2 < g2) {
                      if (x2 += l2 + f2 - g2, g2 -= f2, g2 < p2) {
                        p2 -= g2;
                        do {
                          R2[a2++] = c2[x2++];
                        } while (--g2);
                        if (x2 = 0, f2 < p2) {
                          g2 = f2, p2 -= g2;
                          do {
                            R2[a2++] = c2[x2++];
                          } while (--g2);
                          x2 = a2 - v2, y2 = R2;
                        }
                      }
                    } else if (x2 += f2 - g2, g2 < p2) {
                      p2 -= g2;
                      do {
                        R2[a2++] = c2[x2++];
                      } while (--g2);
                      x2 = a2 - v2, y2 = R2;
                    }
                    for (; p2 > 2; )
                      R2[a2++] = y2[x2++], R2[a2++] = y2[x2++], R2[a2++] = y2[x2++], p2 -= 3;
                    p2 && (R2[a2++] = y2[x2++], p2 > 1 && (R2[a2++] = y2[x2++]));
                  } else {
                    x2 = a2 - v2;
                    do {
                      R2[a2++] = R2[x2++], R2[a2++] = R2[x2++], R2[a2++] = R2[x2++], p2 -= 3;
                    } while (p2 > 2);
                    p2 && (R2[a2++] = R2[x2++], p2 > 1 && (R2[a2++] = R2[x2++]));
                  }
                  break;
                }
            }
            break;
          }
      } while (i2 < n2 && a2 < o2);
    p2 = u2 >> 3, i2 -= p2, u2 -= p2 << 3, h2 &= (1 << u2) - 1, e2.next_in = i2, e2.next_out = a2, e2.avail_in = i2 < n2 ? n2 - i2 + 5 : 5 - (i2 - n2), e2.avail_out = a2 < o2 ? o2 - a2 + 257 : 257 - (a2 - o2), A2.hold = h2, A2.bits = u2;
  };
  const r = 15, o = new Uint16Array([
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    13,
    15,
    17,
    19,
    23,
    27,
    31,
    35,
    43,
    51,
    59,
    67,
    83,
    99,
    115,
    131,
    163,
    195,
    227,
    258,
    0,
    0
  ]), s = new Uint8Array([
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    17,
    17,
    17,
    17,
    18,
    18,
    18,
    18,
    19,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    21,
    21,
    21,
    21,
    16,
    72,
    78
  ]), l = new Uint16Array([
    1,
    2,
    3,
    4,
    5,
    7,
    9,
    13,
    17,
    25,
    33,
    49,
    65,
    97,
    129,
    193,
    257,
    385,
    513,
    769,
    1025,
    1537,
    2049,
    3073,
    4097,
    6145,
    8193,
    12289,
    16385,
    24577,
    0,
    0
  ]), d = new Uint8Array([
    16,
    16,
    16,
    16,
    17,
    17,
    18,
    18,
    19,
    19,
    20,
    20,
    21,
    21,
    22,
    22,
    23,
    23,
    24,
    24,
    25,
    25,
    26,
    26,
    27,
    27,
    28,
    28,
    29,
    29,
    64,
    64
  ]);
  var f = (e2, t2, i2, n2, a2, f2, c2, h2) => {
    const u2 = h2.bits;
    let w2, b2, k2, m2, _2, g2, p2 = 0, v2 = 0, x2 = 0, y2 = 0, E2 = 0, R2 = 0, A2 = 0, Z2 = 0, S2 = 0, T2 = 0, O2 = null, U2 = 0;
    const D2 = new Uint16Array(16), I2 = new Uint16Array(16);
    let B2, N2, C2, z2 = null, F2 = 0;
    for (p2 = 0; p2 <= r; p2++)
      D2[p2] = 0;
    for (v2 = 0; v2 < n2; v2++)
      D2[t2[i2 + v2]]++;
    for (E2 = u2, y2 = r; y2 >= 1 && D2[y2] === 0; y2--)
      ;
    if (E2 > y2 && (E2 = y2), y2 === 0)
      return a2[f2++] = 20971520, a2[f2++] = 20971520, h2.bits = 1, 0;
    for (x2 = 1; x2 < y2 && D2[x2] === 0; x2++)
      ;
    for (E2 < x2 && (E2 = x2), Z2 = 1, p2 = 1; p2 <= r; p2++)
      if (Z2 <<= 1, Z2 -= D2[p2], Z2 < 0)
        return -1;
    if (Z2 > 0 && (e2 === 0 || y2 !== 1))
      return -1;
    for (I2[1] = 0, p2 = 1; p2 < r; p2++)
      I2[p2 + 1] = I2[p2] + D2[p2];
    for (v2 = 0; v2 < n2; v2++)
      t2[i2 + v2] !== 0 && (c2[I2[t2[i2 + v2]]++] = v2);
    if (e2 === 0 ? (O2 = z2 = c2, g2 = 19) : e2 === 1 ? (O2 = o, U2 -= 257, z2 = s, F2 -= 257, g2 = 256) : (O2 = l, z2 = d, g2 = -1), T2 = 0, v2 = 0, p2 = x2, _2 = f2, R2 = E2, A2 = 0, k2 = -1, S2 = 1 << E2, m2 = S2 - 1, e2 === 1 && S2 > 852 || e2 === 2 && S2 > 592)
      return 1;
    for (; ; ) {
      B2 = p2 - A2, c2[v2] < g2 ? (N2 = 0, C2 = c2[v2]) : c2[v2] > g2 ? (N2 = z2[F2 + c2[v2]], C2 = O2[U2 + c2[v2]]) : (N2 = 96, C2 = 0), w2 = 1 << p2 - A2, b2 = 1 << R2, x2 = b2;
      do {
        b2 -= w2, a2[_2 + (T2 >> A2) + b2] = B2 << 24 | N2 << 16 | C2 | 0;
      } while (b2 !== 0);
      for (w2 = 1 << p2 - 1; T2 & w2; )
        w2 >>= 1;
      if (w2 !== 0 ? (T2 &= w2 - 1, T2 += w2) : T2 = 0, v2++, --D2[p2] == 0) {
        if (p2 === y2)
          break;
        p2 = t2[i2 + c2[v2]];
      }
      if (p2 > E2 && (T2 & m2) !== k2) {
        for (A2 === 0 && (A2 = E2), _2 += x2, R2 = p2 - A2, Z2 = 1 << R2; R2 + A2 < y2 && (Z2 -= D2[R2 + A2], !(Z2 <= 0)); )
          R2++, Z2 <<= 1;
        if (S2 += 1 << R2, e2 === 1 && S2 > 852 || e2 === 2 && S2 > 592)
          return 1;
        k2 = T2 & m2, a2[k2] = E2 << 24 | R2 << 16 | _2 - f2 | 0;
      }
    }
    return T2 !== 0 && (a2[_2 + T2] = p2 - A2 << 24 | 64 << 16 | 0), h2.bits = E2, 0;
  }, c = {
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    Z_MEM_ERROR: -4,
    Z_BUF_ERROR: -5,
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    Z_BINARY: 0,
    Z_TEXT: 1,
    Z_UNKNOWN: 2,
    Z_DEFLATED: 8
  };
  const {
    Z_FINISH: h,
    Z_BLOCK: u,
    Z_TREES: w,
    Z_OK: b,
    Z_STREAM_END: k,
    Z_NEED_DICT: m,
    Z_STREAM_ERROR: _,
    Z_DATA_ERROR: g,
    Z_MEM_ERROR: p,
    Z_BUF_ERROR: v,
    Z_DEFLATED: x
  } = c, y = 12, E = 30, R = (e2) => (e2 >>> 24 & 255) + (e2 >>> 8 & 65280) + ((65280 & e2) << 8) + ((255 & e2) << 24);
  function A() {
    this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
  }
  const Z = (e2) => {
    if (!e2 || !e2.state)
      return _;
    const t2 = e2.state;
    return e2.total_in = e2.total_out = t2.total = 0, e2.msg = "", t2.wrap && (e2.adler = 1 & t2.wrap), t2.mode = 1, t2.last = 0, t2.havedict = 0, t2.dmax = 32768, t2.head = null, t2.hold = 0, t2.bits = 0, t2.lencode = t2.lendyn = new Int32Array(852), t2.distcode = t2.distdyn = new Int32Array(592), t2.sane = 1, t2.back = -1, b;
  }, S = (e2) => {
    if (!e2 || !e2.state)
      return _;
    const t2 = e2.state;
    return t2.wsize = 0, t2.whave = 0, t2.wnext = 0, Z(e2);
  }, T = (e2, t2) => {
    let i2;
    if (!e2 || !e2.state)
      return _;
    const n2 = e2.state;
    return t2 < 0 ? (i2 = 0, t2 = -t2) : (i2 = 1 + (t2 >> 4), t2 < 48 && (t2 &= 15)), t2 && (t2 < 8 || t2 > 15) ? _ : (n2.window !== null && n2.wbits !== t2 && (n2.window = null), n2.wrap = i2, n2.wbits = t2, S(e2));
  }, O = (e2, t2) => {
    if (!e2)
      return _;
    const i2 = new A();
    e2.state = i2, i2.window = null;
    const n2 = T(e2, t2);
    return n2 !== b && (e2.state = null), n2;
  };
  let U, D, I = true;
  const B = (e2) => {
    if (I) {
      U = new Int32Array(512), D = new Int32Array(32);
      let t2 = 0;
      for (; t2 < 144; )
        e2.lens[t2++] = 8;
      for (; t2 < 256; )
        e2.lens[t2++] = 9;
      for (; t2 < 280; )
        e2.lens[t2++] = 7;
      for (; t2 < 288; )
        e2.lens[t2++] = 8;
      for (f(1, e2.lens, 0, 288, U, 0, e2.work, {
        bits: 9
      }), t2 = 0; t2 < 32; )
        e2.lens[t2++] = 5;
      f(2, e2.lens, 0, 32, D, 0, e2.work, {
        bits: 5
      }), I = false;
    }
    e2.lencode = U, e2.lenbits = 9, e2.distcode = D, e2.distbits = 5;
  }, N = (e2, t2, i2, n2) => {
    let a2;
    const r2 = e2.state;
    return r2.window === null && (r2.wsize = 1 << r2.wbits, r2.wnext = 0, r2.whave = 0, r2.window = new Uint8Array(r2.wsize)), n2 >= r2.wsize ? (r2.window.set(t2.subarray(i2 - r2.wsize, i2), 0), r2.wnext = 0, r2.whave = r2.wsize) : (a2 = r2.wsize - r2.wnext, a2 > n2 && (a2 = n2), r2.window.set(t2.subarray(i2 - n2, i2 - n2 + a2), r2.wnext), (n2 -= a2) ? (r2.window.set(t2.subarray(i2 - n2, i2), 0), r2.wnext = n2, r2.whave = r2.wsize) : (r2.wnext += a2, r2.wnext === r2.wsize && (r2.wnext = 0), r2.whave < r2.wsize && (r2.whave += a2))), 0;
  };
  var C = {
    inflateReset: S,
    inflateReset2: T,
    inflateResetKeep: Z,
    inflateInit: (e2) => O(e2, 15),
    inflateInit2: O,
    inflate: (e2, i2) => {
      let r2, o2, s2, l2, d2, c2, A2, Z2, S2, T2, O2, U2, D2, I2, C2, z2, F2, L2, M2, H2, j2, K2, P2 = 0;
      const Y2 = new Uint8Array(4);
      let G2, X2;
      const W2 = new Uint8Array([
        16,
        17,
        18,
        0,
        8,
        7,
        9,
        6,
        10,
        5,
        11,
        4,
        12,
        3,
        13,
        2,
        14,
        1,
        15
      ]);
      if (!e2 || !e2.state || !e2.output || !e2.input && e2.avail_in !== 0)
        return _;
      r2 = e2.state, r2.mode === y && (r2.mode = 13), d2 = e2.next_out, s2 = e2.output, A2 = e2.avail_out, l2 = e2.next_in, o2 = e2.input, c2 = e2.avail_in, Z2 = r2.hold, S2 = r2.bits, T2 = c2, O2 = A2, K2 = b;
      e:
        for (; ; )
          switch (r2.mode) {
            case 1:
              if (r2.wrap === 0) {
                r2.mode = 13;
                break;
              }
              for (; S2 < 16; ) {
                if (c2 === 0)
                  break e;
                c2--, Z2 += o2[l2++] << S2, S2 += 8;
              }
              if (2 & r2.wrap && Z2 === 35615) {
                r2.check = 0, Y2[0] = 255 & Z2, Y2[1] = Z2 >>> 8 & 255, r2.check = n(r2.check, Y2, 2, 0), Z2 = 0, S2 = 0, r2.mode = 2;
                break;
              }
              if (r2.flags = 0, r2.head && (r2.head.done = false), !(1 & r2.wrap) || (((255 & Z2) << 8) + (Z2 >> 8)) % 31) {
                e2.msg = "incorrect header check", r2.mode = E;
                break;
              }
              if ((15 & Z2) !== x) {
                e2.msg = "unknown compression method", r2.mode = E;
                break;
              }
              if (Z2 >>>= 4, S2 -= 4, j2 = 8 + (15 & Z2), r2.wbits === 0)
                r2.wbits = j2;
              else if (j2 > r2.wbits) {
                e2.msg = "invalid window size", r2.mode = E;
                break;
              }
              r2.dmax = 1 << r2.wbits, e2.adler = r2.check = 1, r2.mode = 512 & Z2 ? 10 : y, Z2 = 0, S2 = 0;
              break;
            case 2:
              for (; S2 < 16; ) {
                if (c2 === 0)
                  break e;
                c2--, Z2 += o2[l2++] << S2, S2 += 8;
              }
              if (r2.flags = Z2, (255 & r2.flags) !== x) {
                e2.msg = "unknown compression method", r2.mode = E;
                break;
              }
              if (57344 & r2.flags) {
                e2.msg = "unknown header flags set", r2.mode = E;
                break;
              }
              r2.head && (r2.head.text = Z2 >> 8 & 1), 512 & r2.flags && (Y2[0] = 255 & Z2, Y2[1] = Z2 >>> 8 & 255, r2.check = n(r2.check, Y2, 2, 0)), Z2 = 0, S2 = 0, r2.mode = 3;
            case 3:
              for (; S2 < 32; ) {
                if (c2 === 0)
                  break e;
                c2--, Z2 += o2[l2++] << S2, S2 += 8;
              }
              r2.head && (r2.head.time = Z2), 512 & r2.flags && (Y2[0] = 255 & Z2, Y2[1] = Z2 >>> 8 & 255, Y2[2] = Z2 >>> 16 & 255, Y2[3] = Z2 >>> 24 & 255, r2.check = n(r2.check, Y2, 4, 0)), Z2 = 0, S2 = 0, r2.mode = 4;
            case 4:
              for (; S2 < 16; ) {
                if (c2 === 0)
                  break e;
                c2--, Z2 += o2[l2++] << S2, S2 += 8;
              }
              r2.head && (r2.head.xflags = 255 & Z2, r2.head.os = Z2 >> 8), 512 & r2.flags && (Y2[0] = 255 & Z2, Y2[1] = Z2 >>> 8 & 255, r2.check = n(r2.check, Y2, 2, 0)), Z2 = 0, S2 = 0, r2.mode = 5;
            case 5:
              if (1024 & r2.flags) {
                for (; S2 < 16; ) {
                  if (c2 === 0)
                    break e;
                  c2--, Z2 += o2[l2++] << S2, S2 += 8;
                }
                r2.length = Z2, r2.head && (r2.head.extra_len = Z2), 512 & r2.flags && (Y2[0] = 255 & Z2, Y2[1] = Z2 >>> 8 & 255, r2.check = n(r2.check, Y2, 2, 0)), Z2 = 0, S2 = 0;
              } else
                r2.head && (r2.head.extra = null);
              r2.mode = 6;
            case 6:
              if (1024 & r2.flags && (U2 = r2.length, U2 > c2 && (U2 = c2), U2 && (r2.head && (j2 = r2.head.extra_len - r2.length, r2.head.extra || (r2.head.extra = new Uint8Array(r2.head.extra_len)), r2.head.extra.set(o2.subarray(l2, l2 + U2), j2)), 512 & r2.flags && (r2.check = n(r2.check, o2, U2, l2)), c2 -= U2, l2 += U2, r2.length -= U2), r2.length))
                break e;
              r2.length = 0, r2.mode = 7;
            case 7:
              if (2048 & r2.flags) {
                if (c2 === 0)
                  break e;
                U2 = 0;
                do {
                  j2 = o2[l2 + U2++], r2.head && j2 && r2.length < 65536 && (r2.head.name += String.fromCharCode(j2));
                } while (j2 && U2 < c2);
                if (512 & r2.flags && (r2.check = n(r2.check, o2, U2, l2)), c2 -= U2, l2 += U2, j2)
                  break e;
              } else
                r2.head && (r2.head.name = null);
              r2.length = 0, r2.mode = 8;
            case 8:
              if (4096 & r2.flags) {
                if (c2 === 0)
                  break e;
                U2 = 0;
                do {
                  j2 = o2[l2 + U2++], r2.head && j2 && r2.length < 65536 && (r2.head.comment += String.fromCharCode(j2));
                } while (j2 && U2 < c2);
                if (512 & r2.flags && (r2.check = n(r2.check, o2, U2, l2)), c2 -= U2, l2 += U2, j2)
                  break e;
              } else
                r2.head && (r2.head.comment = null);
              r2.mode = 9;
            case 9:
              if (512 & r2.flags) {
                for (; S2 < 16; ) {
                  if (c2 === 0)
                    break e;
                  c2--, Z2 += o2[l2++] << S2, S2 += 8;
                }
                if (Z2 !== (65535 & r2.check)) {
                  e2.msg = "header crc mismatch", r2.mode = E;
                  break;
                }
                Z2 = 0, S2 = 0;
              }
              r2.head && (r2.head.hcrc = r2.flags >> 9 & 1, r2.head.done = true), e2.adler = r2.check = 0, r2.mode = y;
              break;
            case 10:
              for (; S2 < 32; ) {
                if (c2 === 0)
                  break e;
                c2--, Z2 += o2[l2++] << S2, S2 += 8;
              }
              e2.adler = r2.check = R(Z2), Z2 = 0, S2 = 0, r2.mode = 11;
            case 11:
              if (r2.havedict === 0)
                return e2.next_out = d2, e2.avail_out = A2, e2.next_in = l2, e2.avail_in = c2, r2.hold = Z2, r2.bits = S2, m;
              e2.adler = r2.check = 1, r2.mode = y;
            case y:
              if (i2 === u || i2 === w)
                break e;
            case 13:
              if (r2.last) {
                Z2 >>>= 7 & S2, S2 -= 7 & S2, r2.mode = 27;
                break;
              }
              for (; S2 < 3; ) {
                if (c2 === 0)
                  break e;
                c2--, Z2 += o2[l2++] << S2, S2 += 8;
              }
              switch (r2.last = 1 & Z2, Z2 >>>= 1, S2 -= 1, 3 & Z2) {
                case 0:
                  r2.mode = 14;
                  break;
                case 1:
                  if (B(r2), r2.mode = 20, i2 === w) {
                    Z2 >>>= 2, S2 -= 2;
                    break e;
                  }
                  break;
                case 2:
                  r2.mode = 17;
                  break;
                case 3:
                  e2.msg = "invalid block type", r2.mode = E;
              }
              Z2 >>>= 2, S2 -= 2;
              break;
            case 14:
              for (Z2 >>>= 7 & S2, S2 -= 7 & S2; S2 < 32; ) {
                if (c2 === 0)
                  break e;
                c2--, Z2 += o2[l2++] << S2, S2 += 8;
              }
              if ((65535 & Z2) != (Z2 >>> 16 ^ 65535)) {
                e2.msg = "invalid stored block lengths", r2.mode = E;
                break;
              }
              if (r2.length = 65535 & Z2, Z2 = 0, S2 = 0, r2.mode = 15, i2 === w)
                break e;
            case 15:
              r2.mode = 16;
            case 16:
              if (U2 = r2.length, U2) {
                if (U2 > c2 && (U2 = c2), U2 > A2 && (U2 = A2), U2 === 0)
                  break e;
                s2.set(o2.subarray(l2, l2 + U2), d2), c2 -= U2, l2 += U2, A2 -= U2, d2 += U2, r2.length -= U2;
                break;
              }
              r2.mode = y;
              break;
            case 17:
              for (; S2 < 14; ) {
                if (c2 === 0)
                  break e;
                c2--, Z2 += o2[l2++] << S2, S2 += 8;
              }
              if (r2.nlen = 257 + (31 & Z2), Z2 >>>= 5, S2 -= 5, r2.ndist = 1 + (31 & Z2), Z2 >>>= 5, S2 -= 5, r2.ncode = 4 + (15 & Z2), Z2 >>>= 4, S2 -= 4, r2.nlen > 286 || r2.ndist > 30) {
                e2.msg = "too many length or distance symbols", r2.mode = E;
                break;
              }
              r2.have = 0, r2.mode = 18;
            case 18:
              for (; r2.have < r2.ncode; ) {
                for (; S2 < 3; ) {
                  if (c2 === 0)
                    break e;
                  c2--, Z2 += o2[l2++] << S2, S2 += 8;
                }
                r2.lens[W2[r2.have++]] = 7 & Z2, Z2 >>>= 3, S2 -= 3;
              }
              for (; r2.have < 19; )
                r2.lens[W2[r2.have++]] = 0;
              if (r2.lencode = r2.lendyn, r2.lenbits = 7, G2 = {
                bits: r2.lenbits
              }, K2 = f(0, r2.lens, 0, 19, r2.lencode, 0, r2.work, G2), r2.lenbits = G2.bits, K2) {
                e2.msg = "invalid code lengths set", r2.mode = E;
                break;
              }
              r2.have = 0, r2.mode = 19;
            case 19:
              for (; r2.have < r2.nlen + r2.ndist; ) {
                for (; P2 = r2.lencode[Z2 & (1 << r2.lenbits) - 1], C2 = P2 >>> 24, z2 = P2 >>> 16 & 255, F2 = 65535 & P2, !(C2 <= S2); ) {
                  if (c2 === 0)
                    break e;
                  c2--, Z2 += o2[l2++] << S2, S2 += 8;
                }
                if (F2 < 16)
                  Z2 >>>= C2, S2 -= C2, r2.lens[r2.have++] = F2;
                else {
                  if (F2 === 16) {
                    for (X2 = C2 + 2; S2 < X2; ) {
                      if (c2 === 0)
                        break e;
                      c2--, Z2 += o2[l2++] << S2, S2 += 8;
                    }
                    if (Z2 >>>= C2, S2 -= C2, r2.have === 0) {
                      e2.msg = "invalid bit length repeat", r2.mode = E;
                      break;
                    }
                    j2 = r2.lens[r2.have - 1], U2 = 3 + (3 & Z2), Z2 >>>= 2, S2 -= 2;
                  } else if (F2 === 17) {
                    for (X2 = C2 + 3; S2 < X2; ) {
                      if (c2 === 0)
                        break e;
                      c2--, Z2 += o2[l2++] << S2, S2 += 8;
                    }
                    Z2 >>>= C2, S2 -= C2, j2 = 0, U2 = 3 + (7 & Z2), Z2 >>>= 3, S2 -= 3;
                  } else {
                    for (X2 = C2 + 7; S2 < X2; ) {
                      if (c2 === 0)
                        break e;
                      c2--, Z2 += o2[l2++] << S2, S2 += 8;
                    }
                    Z2 >>>= C2, S2 -= C2, j2 = 0, U2 = 11 + (127 & Z2), Z2 >>>= 7, S2 -= 7;
                  }
                  if (r2.have + U2 > r2.nlen + r2.ndist) {
                    e2.msg = "invalid bit length repeat", r2.mode = E;
                    break;
                  }
                  for (; U2--; )
                    r2.lens[r2.have++] = j2;
                }
              }
              if (r2.mode === E)
                break;
              if (r2.lens[256] === 0) {
                e2.msg = "invalid code -- missing end-of-block", r2.mode = E;
                break;
              }
              if (r2.lenbits = 9, G2 = {
                bits: r2.lenbits
              }, K2 = f(1, r2.lens, 0, r2.nlen, r2.lencode, 0, r2.work, G2), r2.lenbits = G2.bits, K2) {
                e2.msg = "invalid literal/lengths set", r2.mode = E;
                break;
              }
              if (r2.distbits = 6, r2.distcode = r2.distdyn, G2 = {
                bits: r2.distbits
              }, K2 = f(2, r2.lens, r2.nlen, r2.ndist, r2.distcode, 0, r2.work, G2), r2.distbits = G2.bits, K2) {
                e2.msg = "invalid distances set", r2.mode = E;
                break;
              }
              if (r2.mode = 20, i2 === w)
                break e;
            case 20:
              r2.mode = 21;
            case 21:
              if (c2 >= 6 && A2 >= 258) {
                e2.next_out = d2, e2.avail_out = A2, e2.next_in = l2, e2.avail_in = c2, r2.hold = Z2, r2.bits = S2, a(e2, O2), d2 = e2.next_out, s2 = e2.output, A2 = e2.avail_out, l2 = e2.next_in, o2 = e2.input, c2 = e2.avail_in, Z2 = r2.hold, S2 = r2.bits, r2.mode === y && (r2.back = -1);
                break;
              }
              for (r2.back = 0; P2 = r2.lencode[Z2 & (1 << r2.lenbits) - 1], C2 = P2 >>> 24, z2 = P2 >>> 16 & 255, F2 = 65535 & P2, !(C2 <= S2); ) {
                if (c2 === 0)
                  break e;
                c2--, Z2 += o2[l2++] << S2, S2 += 8;
              }
              if (z2 && (240 & z2) == 0) {
                for (L2 = C2, M2 = z2, H2 = F2; P2 = r2.lencode[H2 + ((Z2 & (1 << L2 + M2) - 1) >> L2)], C2 = P2 >>> 24, z2 = P2 >>> 16 & 255, F2 = 65535 & P2, !(L2 + C2 <= S2); ) {
                  if (c2 === 0)
                    break e;
                  c2--, Z2 += o2[l2++] << S2, S2 += 8;
                }
                Z2 >>>= L2, S2 -= L2, r2.back += L2;
              }
              if (Z2 >>>= C2, S2 -= C2, r2.back += C2, r2.length = F2, z2 === 0) {
                r2.mode = 26;
                break;
              }
              if (32 & z2) {
                r2.back = -1, r2.mode = y;
                break;
              }
              if (64 & z2) {
                e2.msg = "invalid literal/length code", r2.mode = E;
                break;
              }
              r2.extra = 15 & z2, r2.mode = 22;
            case 22:
              if (r2.extra) {
                for (X2 = r2.extra; S2 < X2; ) {
                  if (c2 === 0)
                    break e;
                  c2--, Z2 += o2[l2++] << S2, S2 += 8;
                }
                r2.length += Z2 & (1 << r2.extra) - 1, Z2 >>>= r2.extra, S2 -= r2.extra, r2.back += r2.extra;
              }
              r2.was = r2.length, r2.mode = 23;
            case 23:
              for (; P2 = r2.distcode[Z2 & (1 << r2.distbits) - 1], C2 = P2 >>> 24, z2 = P2 >>> 16 & 255, F2 = 65535 & P2, !(C2 <= S2); ) {
                if (c2 === 0)
                  break e;
                c2--, Z2 += o2[l2++] << S2, S2 += 8;
              }
              if ((240 & z2) == 0) {
                for (L2 = C2, M2 = z2, H2 = F2; P2 = r2.distcode[H2 + ((Z2 & (1 << L2 + M2) - 1) >> L2)], C2 = P2 >>> 24, z2 = P2 >>> 16 & 255, F2 = 65535 & P2, !(L2 + C2 <= S2); ) {
                  if (c2 === 0)
                    break e;
                  c2--, Z2 += o2[l2++] << S2, S2 += 8;
                }
                Z2 >>>= L2, S2 -= L2, r2.back += L2;
              }
              if (Z2 >>>= C2, S2 -= C2, r2.back += C2, 64 & z2) {
                e2.msg = "invalid distance code", r2.mode = E;
                break;
              }
              r2.offset = F2, r2.extra = 15 & z2, r2.mode = 24;
            case 24:
              if (r2.extra) {
                for (X2 = r2.extra; S2 < X2; ) {
                  if (c2 === 0)
                    break e;
                  c2--, Z2 += o2[l2++] << S2, S2 += 8;
                }
                r2.offset += Z2 & (1 << r2.extra) - 1, Z2 >>>= r2.extra, S2 -= r2.extra, r2.back += r2.extra;
              }
              if (r2.offset > r2.dmax) {
                e2.msg = "invalid distance too far back", r2.mode = E;
                break;
              }
              r2.mode = 25;
            case 25:
              if (A2 === 0)
                break e;
              if (U2 = O2 - A2, r2.offset > U2) {
                if (U2 = r2.offset - U2, U2 > r2.whave && r2.sane) {
                  e2.msg = "invalid distance too far back", r2.mode = E;
                  break;
                }
                U2 > r2.wnext ? (U2 -= r2.wnext, D2 = r2.wsize - U2) : D2 = r2.wnext - U2, U2 > r2.length && (U2 = r2.length), I2 = r2.window;
              } else
                I2 = s2, D2 = d2 - r2.offset, U2 = r2.length;
              U2 > A2 && (U2 = A2), A2 -= U2, r2.length -= U2;
              do {
                s2[d2++] = I2[D2++];
              } while (--U2);
              r2.length === 0 && (r2.mode = 21);
              break;
            case 26:
              if (A2 === 0)
                break e;
              s2[d2++] = r2.length, A2--, r2.mode = 21;
              break;
            case 27:
              if (r2.wrap) {
                for (; S2 < 32; ) {
                  if (c2 === 0)
                    break e;
                  c2--, Z2 |= o2[l2++] << S2, S2 += 8;
                }
                if (O2 -= A2, e2.total_out += O2, r2.total += O2, O2 && (e2.adler = r2.check = r2.flags ? n(r2.check, s2, O2, d2 - O2) : t(r2.check, s2, O2, d2 - O2)), O2 = A2, (r2.flags ? Z2 : R(Z2)) !== r2.check) {
                  e2.msg = "incorrect data check", r2.mode = E;
                  break;
                }
                Z2 = 0, S2 = 0;
              }
              r2.mode = 28;
            case 28:
              if (r2.wrap && r2.flags) {
                for (; S2 < 32; ) {
                  if (c2 === 0)
                    break e;
                  c2--, Z2 += o2[l2++] << S2, S2 += 8;
                }
                if (Z2 !== (4294967295 & r2.total)) {
                  e2.msg = "incorrect length check", r2.mode = E;
                  break;
                }
                Z2 = 0, S2 = 0;
              }
              r2.mode = 29;
            case 29:
              K2 = k;
              break e;
            case E:
              K2 = g;
              break e;
            case 31:
              return p;
            case 32:
            default:
              return _;
          }
      return e2.next_out = d2, e2.avail_out = A2, e2.next_in = l2, e2.avail_in = c2, r2.hold = Z2, r2.bits = S2, (r2.wsize || O2 !== e2.avail_out && r2.mode < E && (r2.mode < 27 || i2 !== h)) && N(e2, e2.output, e2.next_out, O2 - e2.avail_out), T2 -= e2.avail_in, O2 -= e2.avail_out, e2.total_in += T2, e2.total_out += O2, r2.total += O2, r2.wrap && O2 && (e2.adler = r2.check = r2.flags ? n(r2.check, s2, O2, e2.next_out - O2) : t(r2.check, s2, O2, e2.next_out - O2)), e2.data_type = r2.bits + (r2.last ? 64 : 0) + (r2.mode === y ? 128 : 0) + (r2.mode === 20 || r2.mode === 15 ? 256 : 0), (T2 === 0 && O2 === 0 || i2 === h) && K2 === b && (K2 = v), K2;
    },
    inflateEnd: (e2) => {
      if (!e2 || !e2.state)
        return _;
      let t2 = e2.state;
      return t2.window && (t2.window = null), e2.state = null, b;
    },
    inflateGetHeader: (e2, t2) => {
      if (!e2 || !e2.state)
        return _;
      const i2 = e2.state;
      return (2 & i2.wrap) == 0 ? _ : (i2.head = t2, t2.done = false, b);
    },
    inflateSetDictionary: (e2, i2) => {
      const n2 = i2.length;
      let a2, r2, o2;
      return e2 && e2.state ? (a2 = e2.state, a2.wrap !== 0 && a2.mode !== 11 ? _ : a2.mode === 11 && (r2 = 1, r2 = t(r2, i2, n2, 0), r2 !== a2.check) ? g : (o2 = N(e2, i2, n2, n2), o2 ? (a2.mode = 31, p) : (a2.havedict = 1, b))) : _;
    },
    inflateInfo: "pako inflate (from Nodeca project)"
  };
  const z = (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2);
  var F = function(e2) {
    const t2 = Array.prototype.slice.call(arguments, 1);
    for (; t2.length; ) {
      const i2 = t2.shift();
      if (i2) {
        if (typeof i2 != "object")
          throw new TypeError(i2 + "must be non-object");
        for (const t3 in i2)
          z(i2, t3) && (e2[t3] = i2[t3]);
      }
    }
    return e2;
  }, L = (e2) => {
    let t2 = 0;
    for (let i3 = 0, n2 = e2.length; i3 < n2; i3++)
      t2 += e2[i3].length;
    const i2 = new Uint8Array(t2);
    for (let t3 = 0, n2 = 0, a2 = e2.length; t3 < a2; t3++) {
      let a3 = e2[t3];
      i2.set(a3, n2), n2 += a3.length;
    }
    return i2;
  };
  let M = true;
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch (e2) {
    M = false;
  }
  const H = new Uint8Array(256);
  for (let e2 = 0; e2 < 256; e2++)
    H[e2] = e2 >= 252 ? 6 : e2 >= 248 ? 5 : e2 >= 240 ? 4 : e2 >= 224 ? 3 : e2 >= 192 ? 2 : 1;
  H[254] = H[254] = 1;
  var j = (e2) => {
    if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
      return new TextEncoder().encode(e2);
    let t2, i2, n2, a2, r2, o2 = e2.length, s2 = 0;
    for (a2 = 0; a2 < o2; a2++)
      i2 = e2.charCodeAt(a2), (64512 & i2) == 55296 && a2 + 1 < o2 && (n2 = e2.charCodeAt(a2 + 1), (64512 & n2) == 56320 && (i2 = 65536 + (i2 - 55296 << 10) + (n2 - 56320), a2++)), s2 += i2 < 128 ? 1 : i2 < 2048 ? 2 : i2 < 65536 ? 3 : 4;
    for (t2 = new Uint8Array(s2), r2 = 0, a2 = 0; r2 < s2; a2++)
      i2 = e2.charCodeAt(a2), (64512 & i2) == 55296 && a2 + 1 < o2 && (n2 = e2.charCodeAt(a2 + 1), (64512 & n2) == 56320 && (i2 = 65536 + (i2 - 55296 << 10) + (n2 - 56320), a2++)), i2 < 128 ? t2[r2++] = i2 : i2 < 2048 ? (t2[r2++] = 192 | i2 >>> 6, t2[r2++] = 128 | 63 & i2) : i2 < 65536 ? (t2[r2++] = 224 | i2 >>> 12, t2[r2++] = 128 | i2 >>> 6 & 63, t2[r2++] = 128 | 63 & i2) : (t2[r2++] = 240 | i2 >>> 18, t2[r2++] = 128 | i2 >>> 12 & 63, t2[r2++] = 128 | i2 >>> 6 & 63, t2[r2++] = 128 | 63 & i2);
    return t2;
  }, K = (e2, t2) => {
    const i2 = t2 || e2.length;
    if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
      return new TextDecoder().decode(e2.subarray(0, t2));
    let n2, a2;
    const r2 = new Array(2 * i2);
    for (a2 = 0, n2 = 0; n2 < i2; ) {
      let t3 = e2[n2++];
      if (t3 < 128) {
        r2[a2++] = t3;
        continue;
      }
      let o2 = H[t3];
      if (o2 > 4)
        r2[a2++] = 65533, n2 += o2 - 1;
      else {
        for (t3 &= o2 === 2 ? 31 : o2 === 3 ? 15 : 7; o2 > 1 && n2 < i2; )
          t3 = t3 << 6 | 63 & e2[n2++], o2--;
        o2 > 1 ? r2[a2++] = 65533 : t3 < 65536 ? r2[a2++] = t3 : (t3 -= 65536, r2[a2++] = 55296 | t3 >> 10 & 1023, r2[a2++] = 56320 | 1023 & t3);
      }
    }
    return ((e3, t3) => {
      if (t3 < 65534 && e3.subarray && M)
        return String.fromCharCode.apply(null, e3.length === t3 ? e3 : e3.subarray(0, t3));
      let i3 = "";
      for (let n3 = 0; n3 < t3; n3++)
        i3 += String.fromCharCode(e3[n3]);
      return i3;
    })(r2, a2);
  }, P = (e2, t2) => {
    (t2 = t2 || e2.length) > e2.length && (t2 = e2.length);
    let i2 = t2 - 1;
    for (; i2 >= 0 && (192 & e2[i2]) == 128; )
      i2--;
    return i2 < 0 || i2 === 0 ? t2 : i2 + H[e2[i2]] > t2 ? i2 : t2;
  }, Y = {
    2: "need dictionary",
    1: "stream end",
    0: "",
    "-1": "file error",
    "-2": "stream error",
    "-3": "data error",
    "-4": "insufficient memory",
    "-5": "buffer error",
    "-6": "incompatible version"
  };
  var G = function() {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
  };
  var X = function() {
    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
  };
  const W = Object.prototype.toString, {
    Z_NO_FLUSH: q,
    Z_FINISH: J,
    Z_OK: Q,
    Z_STREAM_END: V,
    Z_NEED_DICT: $,
    Z_STREAM_ERROR: ee,
    Z_DATA_ERROR: te,
    Z_MEM_ERROR: ie
  } = c;
  function ne(e2) {
    this.options = F({
      chunkSize: 65536,
      windowBits: 15,
      to: ""
    }, e2 || {});
    const t2 = this.options;
    t2.raw && t2.windowBits >= 0 && t2.windowBits < 16 && (t2.windowBits = -t2.windowBits, t2.windowBits === 0 && (t2.windowBits = -15)), !(t2.windowBits >= 0 && t2.windowBits < 16) || e2 && e2.windowBits || (t2.windowBits += 32), t2.windowBits > 15 && t2.windowBits < 48 && (15 & t2.windowBits) == 0 && (t2.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new G(), this.strm.avail_out = 0;
    let i2 = C.inflateInit2(this.strm, t2.windowBits);
    if (i2 !== Q)
      throw new Error(Y[i2]);
    if (this.header = new X(), C.inflateGetHeader(this.strm, this.header), t2.dictionary && (typeof t2.dictionary == "string" ? t2.dictionary = j(t2.dictionary) : W.call(t2.dictionary) === "[object ArrayBuffer]" && (t2.dictionary = new Uint8Array(t2.dictionary)), t2.raw && (i2 = C.inflateSetDictionary(this.strm, t2.dictionary), i2 !== Q)))
      throw new Error(Y[i2]);
  }
  function ae(e2, t2) {
    const i2 = new ne(t2);
    if (i2.push(e2), i2.err)
      throw i2.msg || Y[i2.err];
    return i2.result;
  }
  ne.prototype.push = function(e2, t2) {
    const i2 = this.strm, n2 = this.options.chunkSize, a2 = this.options.dictionary;
    let r2, o2, s2;
    if (this.ended)
      return false;
    for (o2 = t2 === ~~t2 ? t2 : t2 === true ? J : q, W.call(e2) === "[object ArrayBuffer]" ? i2.input = new Uint8Array(e2) : i2.input = e2, i2.next_in = 0, i2.avail_in = i2.input.length; ; ) {
      for (i2.avail_out === 0 && (i2.output = new Uint8Array(n2), i2.next_out = 0, i2.avail_out = n2), r2 = C.inflate(i2, o2), r2 === $ && a2 && (r2 = C.inflateSetDictionary(i2, a2), r2 === Q ? r2 = C.inflate(i2, o2) : r2 === te && (r2 = $)); i2.avail_in > 0 && r2 === V && i2.state.wrap > 0 && e2[i2.next_in] !== 0; )
        C.inflateReset(i2), r2 = C.inflate(i2, o2);
      switch (r2) {
        case ee:
        case te:
        case $:
        case ie:
          return this.onEnd(r2), this.ended = true, false;
      }
      if (s2 = i2.avail_out, i2.next_out && (i2.avail_out === 0 || r2 === V))
        if (this.options.to === "string") {
          let e3 = P(i2.output, i2.next_out), t3 = i2.next_out - e3, a3 = K(i2.output, e3);
          i2.next_out = t3, i2.avail_out = n2 - t3, t3 && i2.output.set(i2.output.subarray(e3, e3 + t3), 0), this.onData(a3);
        } else
          this.onData(i2.output.length === i2.next_out ? i2.output : i2.output.subarray(0, i2.next_out));
      if (r2 !== Q || s2 !== 0) {
        if (r2 === V)
          return r2 = C.inflateEnd(this.strm), this.onEnd(r2), this.ended = true, true;
        if (i2.avail_in === 0)
          break;
      }
    }
    return true;
  }, ne.prototype.onData = function(e2) {
    this.chunks.push(e2);
  }, ne.prototype.onEnd = function(e2) {
    e2 === Q && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = L(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
  };
  var re = ne, oe = ae, se = function(e2, t2) {
    return (t2 = t2 || {}).raw = true, ae(e2, t2);
  }, le = ae, de = c, fe = {
    Inflate: re,
    inflate: oe,
    inflateRaw: se,
    ungzip: le,
    constants: de
  };
  exp.Inflate = re, exp.constants = de, exp.default = fe, exp.inflate = oe, exp.inflateRaw = se, exp.ungzip = le, Object.defineProperty(e, "__esModule", {
    value: true
  });
});
!function(e, t) {
  for (var n in t)
    e[n] = t[n];
}(exp, function(e) {
  var t = {};
  function n(r) {
    if (t[r])
      return t[r].exports;
    var a = t[r] = {
      i: r,
      l: false,
      exports: {}
    };
    return e[r].call(a.exports, a, a.exports, n), a.l = true, a.exports;
  }
  return n.m = e, n.c = t, n.d = function(e2, t2, r) {
    n.o(e2, t2) || Object.defineProperty(e2, t2, {
      configurable: false,
      enumerable: true,
      get: r
    });
  }, n.r = function(e2) {
    Object.defineProperty(e2, "__esModule", {
      value: true
    });
  }, n.n = function(e2) {
    var t2 = e2 && e2.__esModule ? function() {
      return e2.default;
    } : function() {
      return e2;
    };
    return n.d(t2, "a", t2), t2;
  }, n.o = function(e2, t2) {
    return Object.prototype.hasOwnProperty.call(e2, t2);
  }, n.p = "", n.w = {}, n(n.s = 11);
}([
  function(e, t, n) {
    var r;
    Object.defineProperty(t, "__esModule", {
      value: true
    }), function(e2) {
      e2[e2.simple = 0] = "simple", e2[e2.member = 1] = "member";
    }(r || (r = {}));
    var a = function() {
      function e2(e3, t2) {
        this.value = e3, this.kind = t2;
      }
      return Object.defineProperty(e2.prototype, "v", {
        get: function() {
          return this.value;
        },
        set: function(e3) {
          if (this.kind === "const")
            throw new TypeError("Assignment to constant variable");
          this.value = e3;
        },
        enumerable: true,
        configurable: true
      }), e2;
    }();
    t.SimpleValue = a;
    var o = function() {
      function e2(e3, t2) {
        this.obj = e3, this.name = t2;
      }
      return Object.defineProperty(e2.prototype, "v", {
        get: function() {
          return this.obj[this.name];
        },
        set: function(e3) {
          this.obj[this.name] = e3;
        },
        enumerable: true,
        configurable: true
      }), e2;
    }();
    t.MemberValue = o, t.createSimpleValue = function(e2, t2) {
      return t2 === void 0 && (t2 = "var"), new a(e2, t2);
    }, t.createMemberValue = function(e2, t2) {
      return new o(e2, t2);
    };
  },
  function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
      value: true
    });
    var r = n(0), a = function() {
      function e2(e3, t2) {
        this.invasive = false, this.declaration = /* @__PURE__ */ Object.create(null), this.type = e3, this.outer = t2;
      }
      return e2.prototype.get = function(e3, t2) {
        if (t2 === void 0 && (t2 = false), this.declaration[e3])
          return this.declaration[e3];
        if (this.outer)
          return this.outer.get(e3, t2);
        var n2 = this.sdGO.get(e3, t2);
        if (n2)
          return n2;
        throw new ReferenceError(e3 + " is not defined");
      }, e2.prototype.declare = function(e3, t2, n2) {
        if (n2 === void 0 && (n2 = "var"), n2 === "var")
          return this.varDeclare(e3, t2);
        if (n2 === "let")
          return this.letDeclare(e3, t2);
        if (n2 === "const")
          return this.constDeclare(e3, t2);
        throw new Error("eapako: Invalid Variable Declaration Kind");
      }, e2.prototype.varDeclare = function(e3, t2) {
        for (var n2 = this; n2.outer && n2.type !== "function"; )
          n2 = n2.outer;
        return this.declaration[e3] = r.createSimpleValue(t2, "var"), this.declaration[e3];
      }, e2.prototype.letDeclare = function(e3, t2) {
        if (this.declaration[e3])
          throw new SyntaxError("Id '" + e3 + "' has already been declared");
        return this.declaration[e3] = r.createSimpleValue(t2, "let"), this.declaration[e3];
      }, e2.prototype.constDeclare = function(e3, t2, n2) {
        if (n2 === void 0 && (n2 = false), !n2 && this.declaration[e3])
          throw new SyntaxError("Id '" + e3 + "' has already been declared");
        return this.declaration[e3] = r.createSimpleValue(t2, "const"), this.declaration[e3];
      }, e2;
    }();
    t.default = a;
  },
  function(e, t, n) {
    var r;
    Object.defineProperty(t, "__esModule", {
      value: true
    }), function(e2) {
      e2[e2.Continue = 0] = "Continue", e2[e2.Break = 1] = "Break", e2[e2.Return = 2] = "Return";
    }(r = t.SignalType || (t.SignalType = {}));
    var a = function() {
      function e2(e3, t2) {
        this.type = e3, this.value = t2;
      }
      return e2.Continue = function(t2) {
        return new e2(r.Continue, t2);
      }, e2.Break = function(t2) {
        return new e2(r.Break, t2);
      }, e2.Return = function(t2) {
        return new e2(r.Return, t2);
      }, e2.isSignal = function(t2) {
        return t2 instanceof e2;
      }, e2.isContinue = function(t2) {
        return t2 instanceof e2 && t2.type === r.Continue;
      }, e2.isBreak = function(t2) {
        return t2 instanceof e2 && t2.type === r.Break;
      }, e2.isReturn = function(t2) {
        return t2 instanceof e2 && t2.type === r.Return;
      }, e2;
    }();
    t.default = a;
  },
  function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
      value: true
    });
    var r = {
      Infinity: 1 / 0,
      NaN: NaN,
      undefined: void 0,
      isFinite,
      isNaN,
      parseFloat,
      parseInt,
      decodeURI,
      decodeURIComponent,
      encodeURI,
      encodeURIComponent,
      escape,
      unescape,
      Object,
      Function,
      Boolean,
      Error,
      EvalError,
      RangeError,
      ReferenceError,
      SyntaxError,
      TypeError,
      URIError,
      Number,
      Math,
      Date,
      String,
      RegExp,
      Array,
      JSON
    };
    typeof eval != "undefined" && (r.eval = eval), typeof Symbol != "undefined" && (r.Symbol = Symbol), typeof Int8Array != "undefined" && (r.Int8Array = Int8Array), typeof Uint8Array != "undefined" && (r.Uint8Array = Uint8Array), typeof Uint8ClampedArray != "undefined" && (r.Uint8ClampedArray = Uint8ClampedArray), typeof Int16Array != "undefined" && (r.Int16Array = Int16Array), typeof Uint16Array != "undefined" && (r.Uint16Array = Uint16Array), typeof Int32Array != "undefined" && (r.Int32Array = Int32Array), typeof Uint32Array != "undefined" && (r.Uint32Array = Uint32Array), typeof Float32Array != "undefined" && (r.Float32Array = Float32Array), typeof Float64Array != "undefined" && (r.Float64Array = Float64Array), typeof ArrayBuffer != "undefined" && (r.ArrayBuffer = ArrayBuffer), typeof DataView != "undefined" && (r.DataView = DataView), typeof Map != "undefined" && (r.Map = Map), typeof Set != "undefined" && (r.Set = Set), typeof WeakMap != "undefined" && (r.WeakMap = WeakMap), typeof WeakSet != "undefined" && (r.WeakSet = WeakSet), typeof Promise != "undefined" && (r.Promise = Promise), typeof Reflect != "undefined" && (r.Reflect = Reflect), typeof Proxy != "undefined" && (r.Proxy = Proxy), typeof console != "undefined" && (r.console = console), typeof setTimeout != "undefined" && (r.setTimeout = setTimeout), typeof clearTimeout != "undefined" && (r.clearTimeout = clearTimeout), typeof setInterval != "undefined" && (r.setInterval = setInterval), typeof clearInterval != "undefined" && (r.clearInterval = clearInterval), t.default = r;
  },
  function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
      value: true
    }), t.slice = Array.prototype.slice, t.hop = Object.prototype.hasOwnProperty, t.toString = Object.prototype.toString;
  },
  function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
      value: true
    });
    var r = n(0), a = n(4), o = function() {
      function e2(e3) {
        this.sdGO = e3;
      }
      return e2.prototype.get = function(e3, t2) {
        if (t2 === void 0 && (t2 = false), t2 || a.hop.call(this.sdGO, e3))
          return r.createMemberValue(this.sdGO, e3);
      }, e2.prototype.declare = function(e3, t2) {
        this.sdGO[e3] = t2;
      }, e2;
    }();
    t.default = o;
  },
  function(e, t, n) {
    var r = this && this.__importDefault || function(e2) {
      return e2 && e2.__esModule ? e2 : {
        default: e2
      };
    };
    Object.defineProperty(t, "__esModule", {
      value: true
    });
    var a = r(n(1)), o = function() {
      function e2(e3, t2, n2) {
        this.node = e3, this.scope = t2, this.evaluateMap = n2;
      }
      return e2.prototype.evaluate = function(t2, n2) {
        n2 === void 0 && (n2 = {});
        var r2 = new e2(t2, n2.scope || this.scope, this.evaluateMap);
        r2.label = n2.label, r2.extra = n2.extra;
        var a2 = this.evaluateMap[t2.type];
        if (!a2)
          throw new Error('eapako: Node type "' + t2.type + '" is not implemented');
        return a2(r2);
      }, e2.prototype.createBlockScope = function(e3) {
        e3 === void 0 && (e3 = false);
        var t2 = new a.default("block", this.scope);
        return t2.invasive = e3, t2;
      }, e2.prototype.createFunctionScope = function(e3) {
        e3 === void 0 && (e3 = false);
        var t2 = new a.default("function", this.scope);
        return t2.invasive = e3, t2;
      }, e2;
    }();
    t.default = o;
  },
  function(e, t, n) {
    var r = this && this.__importDefault || function(e2) {
      return e2 && e2.__esModule ? e2 : {
        default: e2
      };
    };
    Object.defineProperty(t, "__esModule", {
      value: true
    });
    var a = r(n(2));
    t.ES = function(e2) {
      return e2.evaluate(e2.node.expression, {
        extra: e2.extra
      });
    }, t.BS = function(e2) {
      var t2;
      e2.scope.invasive ? (t2 = e2.scope).invasive = false : t2 = e2.createBlockScope();
      for (var n2 = 0, r2 = e2.node.body; n2 < r2.length; n2++)
        if ((f = r2[n2]).type === "FDt")
          e2.evaluate(f, {
            scope: t2
          });
        else if (f.type === "VD" && f.kind === "var")
          for (var o = 0, i = f.declarations; o < i.length; o++) {
            var u = i[o];
            t2.varDeclare(u.id.name);
          }
      for (var l = 0, c = e2.node.body; l < c.length; l++) {
        var f;
        if ((f = c[l]).type !== "FDt") {
          var s = e2.evaluate(f, {
            scope: t2,
            extra: e2.extra
          });
          if (a.default.isSignal(s))
            return s;
        }
      }
    }, t.AE = function(e2) {
      for (var t2 = [], n2 = 0, r2 = e2.node.elements; n2 < r2.length; n2++) {
        var a2 = r2[n2];
        a2.type !== "SpreadElement" ? t2.push(e2.evaluate(a2)) : t2 = t2.concat(e2.evaluate(a2.argument));
      }
      return t2;
    }, t.OE = function(e2) {
      for (var t2 = {}, n2 = 0, r2 = e2.node.properties; n2 < r2.length; n2++) {
        var a2 = r2[n2], o = void 0;
        o = a2.computed ? a2.key.type === "Id" ? e2.scope.get(a2.key.name).v : e2.evaluate(a2.key) : a2.key.type === "Id" ? a2.key.name : a2.key.value;
        var i = e2.evaluate(a2.value);
        if (a2.kind === "init")
          t2[o] = i;
        else if (a2.kind === "get")
          Object.defineProperty(t2, o, {
            get: i
          });
        else {
          if (a2.kind !== "set")
            throw new Error('eapako: [OE] Unsupported property kind "' + a2.kind + '"');
          Object.defineProperty(t2, o, {
            set: i
          });
        }
      }
      return t2;
    }, t.FE = function(e2) {
      var t2, n2 = e2.node;
      if (n2.generator)
        throw new Error("eapako: Generator Function not implemented");
      return t2 = function() {
        var t3 = e2.createFunctionScope(true);
        t3.constDeclare("this", this), t3.constDeclare("arguments", arguments), e2.extra && e2.extra.SuperClass && (e2.extra.isConstructor || e2.extra.isStaticMethod ? t3.constDeclare("@@eapako/super", e2.extra.SuperClass) : e2.extra.isMethod && t3.constDeclare("@@eapako/super", e2.extra.SuperClass.prototype));
        for (var r2 = 0, o = n2.params.length; r2 < o; r2++) {
          var i = n2.params[r2].name;
          t3.varDeclare(i, arguments[r2]);
        }
        var u = e2.evaluate(n2.body, {
          scope: t3,
          extra: e2.extra
        });
        if (a.default.isReturn(u))
          return u.value;
      }, Object.defineProperties(t2, {
        name: {
          value: n2.id ? n2.id.name : ""
        },
        length: {
          value: n2.params.length
        }
      }), t2;
    }, t.ArrowFE = function(e2) {
      var t2 = e2.node, n2 = function() {
        for (var n3 = e2.createFunctionScope(true), r2 = 0, o = t2.params.length; r2 < o; r2++) {
          var i = t2.params[r2].name;
          n3.varDeclare(i, arguments[r2]);
        }
        var u = e2.evaluate(t2.body, {
          scope: n3,
          extra: e2.extra
        });
        if (a.default.isReturn(u))
          return u.value;
      };
      return Object.defineProperties(n2, {
        length: {
          value: t2.params.length
        }
      }), n2;
    };
  },
  function(e, t, n) {
    var r = this && this.__importDefault || function(e2) {
      return e2 && e2.__esModule ? e2 : {
        default: e2
      };
    };
    Object.defineProperty(t, "__esModule", {
      value: true
    });
    var a = n(0), o = r(n(2));
    function i(e2) {
      var t2 = e2.node, n2 = function() {
        var n3 = e2.createFunctionScope(true);
        n3.constDeclare("this", this), n3.constDeclare("arguments", arguments);
        for (var r2 = 0, a2 = t2.params.length; r2 < a2; r2++) {
          var i2 = t2.params[r2].name;
          n3.varDeclare(i2, arguments[r2]);
        }
        var u2 = e2.evaluate(t2.body, {
          scope: n3
        });
        if (o.default.isReturn(u2))
          return u2.value;
      };
      return Object.defineProperties(n2, {
        name: {
          value: t2.id ? t2.id.name : ""
        },
        length: {
          value: t2.params.length
        }
      }), n2;
    }
    t.Id = function(e2) {
      if (e2.node.name !== "undefined")
        return e2.scope.get(e2.node.name).v;
    }, t.Ll = function(e2) {
      return e2.node.value;
    }, t.Program = function(e2) {
      for (var t2 = 0, n2 = e2.node.body; t2 < n2.length; t2++) {
        var r2 = n2[t2];
        e2.evaluate(r2);
      }
    }, t.ES = function(e2) {
      return e2.evaluate(e2.node.expression);
    }, t.BS = function(e2) {
      var t2;
      e2.scope.invasive ? (t2 = e2.scope).invasive = false : t2 = e2.createBlockScope();
      for (var n2 = 0, r2 = e2.node.body; n2 < r2.length; n2++)
        if ((f2 = r2[n2]).type === "FDt")
          e2.evaluate(f2, {
            scope: t2
          });
        else if (f2.type === "VD" && f2.kind === "var")
          for (var a2 = 0, i2 = f2.declarations; a2 < i2.length; a2++) {
            var u2 = i2[a2];
            t2.varDeclare(u2.id.name);
          }
      for (var l2 = 0, c2 = e2.node.body; l2 < c2.length; l2++) {
        var f2;
        if ((f2 = c2[l2]).type !== "FDt") {
          var s2 = e2.evaluate(f2, {
            scope: t2
          });
          if (o.default.isSignal(s2))
            return s2;
        }
      }
    }, t.EmptyStatement = function(e2) {
    }, t.DebuggerStatement = function(e2) {
    }, t.WithStatement = function(e2) {
      throw new Error('eapako: "' + e2.node.type + '" not implemented');
    }, t.ReturnStatement = function(e2) {
      var t2;
      return e2.node.argument && (t2 = e2.evaluate(e2.node.argument)), o.default.Return(t2);
    }, t.LabeledStatement = function(e2) {
      return e2.evaluate(e2.node.body, {
        label: e2.node.label.name
      });
    }, t.BSs = function(e2) {
      var t2;
      return e2.node.label && (t2 = e2.node.label.name), o.default.Break(t2);
    }, t.ContinueStatement = function(e2) {
      var t2;
      return e2.node.label && (t2 = e2.node.label.name), o.default.Continue(t2);
    }, t.IfStatement = function(e2) {
      return e2.evaluate(e2.node.test) ? e2.evaluate(e2.node.consequent) : e2.node.alternate ? e2.evaluate(e2.node.alternate) : void 0;
    }, t.SS = function(e2) {
      for (var t2 = e2.evaluate(e2.node.discriminant), n2 = false, r2 = 0, a2 = e2.node.cases; r2 < a2.length; r2++) {
        var i2 = a2[r2];
        if (n2 || i2.test && t2 !== e2.evaluate(i2.test) || (n2 = true), n2) {
          var u2 = e2.evaluate(i2);
          if (o.default.isBreak(u2))
            break;
          if (o.default.isContinue(u2))
            continue;
          if (o.default.isReturn(u2))
            return u2;
        }
      }
    }, t.SC = function(e2) {
      for (var t2 = 0, n2 = e2.node.consequent; t2 < n2.length; t2++) {
        var r2 = n2[t2], a2 = e2.evaluate(r2);
        if (o.default.isSignal(a2))
          return a2;
      }
    }, t.ThrowStatement = function(e2) {
      throw e2.evaluate(e2.node.argument);
    }, t.TryStatement = function(e2) {
      var t2 = e2.node, n2 = t2.block, r2 = t2.handler, a2 = t2.finalizer;
      try {
        return e2.evaluate(n2);
      } catch (t3) {
        if (r2) {
          var o2 = r2.param, i2 = e2.createBlockScope(true);
          return i2.letDeclare(o2.name, t3), e2.evaluate(r2, {
            scope: i2
          });
        }
        throw t3;
      } finally {
        if (a2)
          return e2.evaluate(a2);
      }
    }, t.CatchClause = function(e2) {
      return e2.evaluate(e2.node.body);
    }, t.WhileStatement = function(e2) {
      for (; e2.evaluate(e2.node.test); ) {
        var t2 = e2.evaluate(e2.node.body);
        if (o.default.isSignal(t2)) {
          if (o.default.isBreak(t2)) {
            if (!t2.value || t2.value === e2.label)
              break;
          } else if (o.default.isContinue(t2) && (!t2.value || t2.value === e2.label))
            continue;
          return t2;
        }
      }
    }, t.DoWhileStatement = function(e2) {
      do {
        var t2 = e2.evaluate(e2.node.body);
        if (o.default.isSignal(t2)) {
          if (o.default.isBreak(t2)) {
            if (!t2.value || t2.value === e2.label)
              break;
          } else if (o.default.isContinue(t2) && (!t2.value || t2.value === e2.label))
            continue;
          return t2;
        }
      } while (e2.evaluate(e2.node.test));
    }, t.FS = function(e2) {
      var t2 = e2.node, n2 = e2.scope;
      for (t2.init && t2.init.type === "VD" && (n2 = e2.createBlockScope()), t2.init && e2.evaluate(t2.init, {
        scope: n2
      }); !t2.test || e2.evaluate(t2.test, {
        scope: n2
      }); t2.update && e2.evaluate(t2.update, {
        scope: n2
      })) {
        var r2 = e2.evaluate(t2.body, {
          scope: n2
        });
        if (o.default.isSignal(r2)) {
          if (o.default.isBreak(r2)) {
            if (!r2.value || r2.value === e2.label)
              break;
          } else if (o.default.isContinue(r2) && (!r2.value || r2.value === e2.label))
            continue;
          return r2;
        }
      }
    }, t.ForInStatement = function(e2) {
      var t2, n2 = e2.node, r2 = n2.left, a2 = n2.right, i2 = n2.body, u2 = e2.scope;
      if (r2.type === "VD") {
        var l2 = r2.declarations[0].id;
        t2 = u2.declare(l2.name, void 0, r2.kind);
      } else {
        if (r2.type !== "Id")
          throw new Error('eapako: [ForInStatement] Unsupported left type "' + r2.type + '"');
        t2 = u2.get(r2.name, true);
      }
      for (var c2 in e2.evaluate(a2)) {
        t2.v = c2;
        var f2 = e2.evaluate(i2, {
          scope: u2
        });
        if (o.default.isSignal(f2)) {
          if (o.default.isBreak(f2)) {
            if (!f2.value || f2.value === e2.label)
              break;
          } else if (o.default.isContinue(f2) && (!f2.value || f2.value === e2.label))
            continue;
          return f2;
        }
      }
    }, t.FDt = function(e2) {
      var t2 = i(e2);
      return e2.scope.varDeclare(e2.node.id.name, t2), t2;
    }, t.VD = function(e2) {
      for (var t2 = 0, n2 = e2.node.declarations; t2 < n2.length; t2++) {
        var r2 = n2[t2], a2 = r2.id.name, o2 = r2.init ? e2.evaluate(r2.init) : void 0;
        e2.scope.declare(a2, o2);
      }
    }, t.VDt = function(e2) {
      throw new Error("eapako: [VDt] Should not happen");
    }, t.ThisExpression = function(e2) {
      var t2 = e2.scope.get("this");
      return t2 ? t2.v : null;
    }, t.AE = function(e2) {
      return e2.node.elements.map(function(t2) {
        return e2.evaluate(t2);
      });
    }, t.OE = function(e2) {
      for (var t2 = {}, n2 = 0, r2 = e2.node.properties; n2 < r2.length; n2++) {
        var a2 = r2[n2], o2 = void 0;
        if (a2.key.type === "Ll")
          o2 = a2.key.value;
        else {
          if (a2.key.type !== "Id")
            throw new Error('eapako: [OE] Unsupported property key type "' + a2.key.type + '"');
          o2 = a2.key.name;
        }
        t2[o2] = e2.evaluate(a2.value);
      }
      return t2;
    }, t.Property = function(e2) {
      throw new Error("eapako: [Property] Should not happen");
    }, t.FE = i;
    var u = {
      "-": function(e2) {
        return -e2.evaluate(e2.node.argument);
      },
      "+": function(e2) {
        return +e2.evaluate(e2.node.argument);
      },
      "!": function(e2) {
        return !e2.evaluate(e2.node.argument);
      },
      "~": function(e2) {
        return ~e2.evaluate(e2.node.argument);
      },
      typeof: function(e2) {
        if (e2.node.argument.type !== "Id")
          return typeof e2.evaluate(e2.node.argument);
        try {
          var t2 = e2.scope.get(e2.node.argument.name);
          return t2 ? typeof t2.v : "undefined";
        } catch (t3) {
          if (t3.message === e2.node.argument.name + " is not defined")
            return "undefined";
          throw t3;
        }
      },
      void: function(e2) {
        e2.evaluate(e2.node.argument);
      },
      delete: function(e2) {
        var t2 = e2.node.argument;
        return t2.type === "ME" ? delete e2.evaluate(t2.object)[f(t2, e2)] : t2.type !== "Id" && (t2.type === "Ll" || void 0);
      }
    };
    t.UE = function(e2) {
      return u[e2.node.operator](e2);
    };
    var l = {
      "++": function(e2, t2) {
        return t2 ? ++e2.v : e2.v++;
      },
      "--": function(e2, t2) {
        return t2 ? --e2.v : e2.v--;
      }
    };
    t.UEo = function(e2) {
      var t2 = s(e2.node.argument, e2);
      return l[e2.node.operator](t2, e2.node.prefix);
    }, t.BEOperatorEvaluateMap = {
      "==": function(e2, t2) {
        return e2 == t2;
      },
      "!=": function(e2, t2) {
        return e2 != t2;
      },
      "===": function(e2, t2) {
        return e2 === t2;
      },
      "!==": function(e2, t2) {
        return e2 !== t2;
      },
      "<": function(e2, t2) {
        return e2 < t2;
      },
      "<=": function(e2, t2) {
        return e2 <= t2;
      },
      ">": function(e2, t2) {
        return e2 > t2;
      },
      ">=": function(e2, t2) {
        return e2 >= t2;
      },
      "<<": function(e2, t2) {
        return e2 << t2;
      },
      ">>": function(e2, t2) {
        return e2 >> t2;
      },
      ">>>": function(e2, t2) {
        return e2 >>> t2;
      },
      "+": function(e2, t2) {
        return e2 + t2;
      },
      "-": function(e2, t2) {
        return e2 - t2;
      },
      "*": function(e2, t2) {
        return e2 * t2;
      },
      "/": function(e2, t2) {
        return e2 / t2;
      },
      "%": function(e2, t2) {
        return e2 % t2;
      },
      "**": function(e2, t2) {
        throw new Error('eapako: es5 not support operator "**"');
      },
      "|": function(e2, t2) {
        return e2 | t2;
      },
      "^": function(e2, t2) {
        return e2 ^ t2;
      },
      "&": function(e2, t2) {
        return e2 & t2;
      },
      in: function(e2, t2) {
        return e2 in t2;
      },
      instanceof: function(e2, t2) {
        return e2 instanceof t2;
      }
    }, t.BE = function(e2) {
      var n2 = e2.evaluate(e2.node.left), r2 = e2.evaluate(e2.node.right);
      return t.BEOperatorEvaluateMap[e2.node.operator](n2, r2);
    }, t.AEoOperatorEvaluateMap = {
      "=": function(e2, t2) {
        return e2.v = t2;
      },
      "+=": function(e2, t2) {
        return e2.v += t2;
      },
      "-=": function(e2, t2) {
        return e2.v -= t2;
      },
      "*=": function(e2, t2) {
        return e2.v *= t2;
      },
      "/=": function(e2, t2) {
        return e2.v /= t2;
      },
      "%=": function(e2, t2) {
        return e2.v %= t2;
      },
      "**=": function(e2, t2) {
        throw new Error('eapako: es5 not support operator "**=');
      },
      "<<=": function(e2, t2) {
        return e2.v <<= t2;
      },
      ">>=": function(e2, t2) {
        return e2.v >>= t2;
      },
      ">>>=": function(e2, t2) {
        return e2.v >>>= t2;
      },
      "|=": function(e2, t2) {
        return e2.v |= t2;
      },
      "^=": function(e2, t2) {
        return e2.v ^= t2;
      },
      "&=": function(e2, t2) {
        return e2.v &= t2;
      }
    }, t.AEo = function(e2) {
      var n2 = e2.node, r2 = s(n2.left, e2, n2.operator === "=");
      return t.AEoOperatorEvaluateMap[n2.operator](r2, e2.evaluate(n2.right));
    };
    var c = {
      "||": function(e2, t2) {
        return e2 || t2;
      },
      "&&": function(e2, t2) {
        return e2 && t2;
      }
    };
    function f(e2, t2) {
      return e2.computed ? t2.evaluate(e2.property) : e2.property.name;
    }
    function s(e2, t2, n2) {
      if (n2 === void 0 && (n2 = false), e2.type === "Id")
        return t2.scope.get(e2.name, n2);
      if (e2.type === "ME") {
        var r2 = t2.evaluate(e2.object), o2 = f(e2, t2);
        return a.createMemberValue(r2, o2);
      }
      throw new Error('eapako: Not support to get value of node type "' + e2.type + '"');
    }
    t.LE = function(e2) {
      var t2 = e2.evaluate(e2.node.left), n2 = e2.evaluate(e2.node.right);
      return c[e2.node.operator](t2, n2);
    }, t.ME = function(e2) {
      return e2.evaluate(e2.node.object)[f(e2.node, e2)];
    }, t.CEo = function(e2) {
      return e2.evaluate(e2.node.test) ? e2.evaluate(e2.node.consequent) : e2.evaluate(e2.node.alternate);
    }, t.CE = function(e2) {
      var t2, n2 = e2.evaluate(e2.node.callee), r2 = e2.node.arguments.map(function(t3) {
        return e2.evaluate(t3);
      });
      return e2.node.callee.type == "ME" && (t2 = e2.evaluate(e2.node.callee.object)), n2.apply(t2, r2);
    }, t.NewExpression = function(e2) {
      var t2 = e2.evaluate(e2.node.callee), n2 = e2.node.arguments.map(function(t3) {
        return e2.evaluate(t3);
      });
      return new (t2.bind.apply(t2, [null].concat(n2)))();
    }, t.SequenceExpression = function(e2) {
      for (var t2, n2 = 0, r2 = e2.node.expressions; n2 < r2.length; n2++) {
        var a2 = r2[n2];
        t2 = e2.evaluate(a2);
      }
      return t2;
    }, t.getPropertyName = f, t.getIdOrMEValue = s;
  },
  function(e, t, n) {
    var r = this && this.__assign || Object.assign || function(e2) {
      for (var t2, n2 = 1, r2 = arguments.length; n2 < r2; n2++)
        for (var a2 in t2 = arguments[n2])
          Object.prototype.hasOwnProperty.call(t2, a2) && (e2[a2] = t2[a2]);
      return e2;
    }, a = this && this.__importStar || function(e2) {
      if (e2 && e2.__esModule)
        return e2;
      var t2 = {};
      if (e2 != null)
        for (var n2 in e2)
          Object.hasOwnProperty.call(e2, n2) && (t2[n2] = e2[n2]);
      return t2.default = e2, t2;
    };
    Object.defineProperty(t, "__esModule", {
      value: true
    });
    var o = a(n(8)), i = {
      5: o,
      6: r({}, o, a(n(7)))
    };
    t.default = i;
  },
  function(e, t, n) {
    var r = this && this.__assign || Object.assign || function(e2) {
      for (var t2, n2 = 1, r2 = arguments.length; n2 < r2; n2++)
        for (var a2 in t2 = arguments[n2])
          Object.prototype.hasOwnProperty.call(t2, a2) && (e2[a2] = t2[a2]);
      return e2;
    }, a = this && this.__importDefault || function(e2) {
      return e2 && e2.__esModule ? e2 : {
        default: e2
      };
    };
    Object.defineProperty(t, "__esModule", {
      value: true
    });
    var o = a(n(9)), i = a(n(6)), u = a(n(1)), l = a(n(5)), c = a(n(3)), f = n(0), s = {
      es5: 5,
      es2015: 6,
      es2016: 7,
      es2017: 8,
      es2018: 9,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9
    }, d = function() {
      function e2(e3, t2) {
        t2 === void 0 && (t2 = {}), this.options = r({
          ecmaVersion: 5,
          sourceType: "module"
        }, t2), this.options.ecmaVersion = s[this.options.ecmaVersion], this.ast = e3, this.evaluateMap = o.default[this.options.ecmaVersion];
      }
      return e2.prototype.goPako = function(e3) {
        e3 === void 0 && (e3 = {});
        var t2 = this.createGlobalScope(e3), n2 = new i.default(null, t2, this.evaluateMap);
        if (this.options.sourceType === "module") {
          var r2 = {}, a2 = {
            exports: r2
          };
          return t2.declaration.exports = f.createSimpleValue(r2), t2.declaration.module = f.createSimpleValue(a2), n2.evaluate(this.ast), a2.exports;
        }
        return n2.evaluate(this.ast);
      }, e2.prototype.createGlobalScope = function(e3) {
        var t2 = new u.default("function");
        t2.sdGO = new l.default(e3);
        for (var n2 = Object.keys(e3), r2 = 0, a2 = Object.keys(c.default); r2 < a2.length; r2++) {
          var o2 = a2[r2];
          n2.indexOf(o2) < 0 && (t2.declaration[o2] = f.createSimpleValue(c.default[o2]));
        }
        return t2;
      }, e2;
    }();
    t.default = d;
  },
  function(e, t, n) {
    var r = this && this.__importDefault || function(e2) {
      return e2 && e2.__esModule ? e2 : {
        default: e2
      };
    };
    Object.defineProperty(t, "__esModule", {
      value: true
    });
    var a = r(n(10));
    t.goPako = function(e2, t2, n2) {
      return new a.default(e2, n2).goPako(t2);
    };
  }
]));
var pako = {
  goPako: exp.goPako,
  inflate: exp.inflate
};
exports.pako = pako;
