const Scalar = require("ffjavascript").Scalar
const Web3Utils = require("web3-utils");
const ZqField = require("ffjavascript").ZqField;
const F = new ZqField(Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617"));

const {bigint_to_le_hexstring} = require('./bn128_params.js')

const SEED = "mimcsponge";
const NROUNDS = 220;

exports.getConstants = (seed, nRounds) => {
    if (typeof seed === "undefined") seed = SEED;
    if (typeof nRounds === "undefined") nRounds = NROUNDS;
    const cts = new Array(nRounds);
    let c = Web3Utils.keccak256(SEED);
    for (let i=1; i<nRounds; i++) {
        c = Web3Utils.keccak256(c);

        const n1 = Web3Utils.toBN(c).mod(Web3Utils.toBN(F.p.toString()));
        const c2 = Web3Utils.padLeft(Web3Utils.toHex(n1), 64);
        cts[i] = F.e(Web3Utils.toBN(c2).toString());
    }
    cts[0] = F.e(0);
    cts[cts.length - 1] = F.e(0);
    return cts;
};

let mimc_round_constants_mont = [
    0x0n,
    0x53e27bc8307157ce5836bff1f4ee44ae7bdd790e2e696e0965ac8dfe4478c84n,
    0x2bca90bb9ac89253cc300398b121b06b79d381c02f25e76a4876b92b82ed2b58n,
    0xcb30314d7437db9f5072b6600a8566e57818b6ba200a9a85c96ba766407c309n,
    0x2d623578b4d7a6e7adf3ae348f3965af854f39e1204d124a4c0a0b8900fbbfcan,
    0x8031df14eb933553f71f5013b43c6f815f5474e5fce1dc352a3efe1384869b6n,
    0x1e9dce3fb4aff03f842a60b81616647d1afacc6e17400383e596d42b748f4b03n,
    0x11fa45b080f45d7f531112d29e92bfb4ac8be24e461c924e2293d1cc03a4271bn,
    0x2aa1e0af756a2c7f2617403f6e1d83ef3fbd62afd8a3638cf56c490b5e0a0c7dn,
    0x29f9c30db4efe9aef6d59d2187f997c7b20cd5e4889874988723029776002c94n,
    0x89e5ed5f00e9416a077ecd514273720bbac626fd00f1b1ab14832f519ecea5dn,
    0x2061b9d590051271d1fd0ae1242eb7a0063d96e0489f0aac045832a1025b44c4n,
    0x22c7e244015e5d8228a1ae776ec646ef56de42f6cf5417e929071ea9c68ef1f5n,
    0x28752f24383e6552ff4fbf78f2426a10d5f0d5a8e3229e1a5c4a7b221511a59an,
    0x2d7b7158676de0fa57dc9e9831b62d5c2e14bca8cb21aadbb22f2a57a75e9555n,
    0x2fbec01b89d5ee673ca6da94567baa9fd6c1e1785a8ff80aeedcae02ae854861n,
    0x24340a824e7894299bba5f86541809bc3785e6f9dd05fa4180be56cdb814b528n,
    0x20a9f2b2bf65be63b151b673f84f96f66e0d542694f1b502c327f547a8427908n,
    0xdd093f02f8f821efda101936747cc5a1d1941e4180ae43ef4c2a91e2679704an,
    0x2d368b95313a7bf465fe470e903d827502169bcdcdbbcfcc4b5143419be0289dn,
    0x1a3ae77b146542ad882f2cf20ce323c83834c08940cd98b2da018b4d5f294da1n,
    0x1da2e000b10f5c0ba8b4e9554d1979fdae44560dde1171563c5c7db30350fdb0n,
    0xb4163475b22466559e33095713a6660fceb58b54e5825361140045666557769n,
    0x7765f07795960383a38553656461cd4b36ad58790339df8134c91ac2a2b60ean,
    0xc0b55d60d4dbaf235ea545f25929e02bad08a00efe5936d3a4d673d21500e40n,
    0x97d79018c1dc36cfab4b66e82c2e3569aad78db4da396e77cc1039c87daacd8n,
    0x14d8b9a7a723600db866ae62753baac5fa6eced924162a83daaf2e07106c5eban,
    0x87afa054632beaebe833a289f9d50ca3cf6b1dc25dac4554b970eccfbc9994an,
    0x19ec5304410e782fd1cdf97d8010a7822aa38d9132159818f842bdb35cfc73f5n,
    0x23ab6efb6432d128563203021e01c030dbaa8d91c864817cb7dcbcf64c951cdfn,
    0xa3b013912357908227ca712999409e959b7ba69a8fa72dd803cea82aa292fd5n,
    0xe6c446393f50d5048e52b99882aafdbd4a491a37735272fa2979d9ab88105c3n,
    0x18e31c18c7dc4ebb1348f92cd1d36ec53d7440ae34b220ea296fb4af362f209dn,
    0x93487853f27b5591f315c99f7e1d639ecc3f286a5e47d1a854e759da6bc6fen,
    0x37283079a4920e94823c3464f2b95b407ba4e8b19a96773cf6577c4263a3053n,
    0x2ff7c783621b26879affa45f9b116cbad0619b81a0098db2fca2bc05838f65efn,
    0x2e893c2cc0d6fbd992da646542f28754b660e8138aa1a76e8dcd278b2ef1f67dn,
    0x4975241dd60a06e46edcf83ca7b2739cab8ab571688c95cfac9d4bc65135608n,
    0xf44eb3f2d028fa9334f6511a048a834bf40ba1ef4f2752a4f9cc3689758ce77n,
    0x32ad97ced0a6e751ac04606d0487b92252b60b6a09be9fbfc2649fd978e5335n,
    0x21142e942e1eb2783a54294d35ce42ba852a22648bb90e25afa36ebd1c897e85n,
    0xf7635528879fc0ac90be62508ff245fb6335ade5887923f635397d7337fe4dbn,
    0xc04ffd0285073c9a1093ec624e15279c3f75874e5dc34858a4ee2bc272c4012n,
    0x123cfa121ad57eee591d28bd67f1c562c97e33f366920a818984e522c1a693f4n,
    0xc662f964f420fc7300ca429b3599fdffe595ae132924064e8d9fd32586c82f0n,
    0xc3a5c23cb6f75ec05a62d49c72ba72edc24042292dd0e905664de04f84bc182n,
    0xe6146337488141e2f745dccd7afd4032edf896d51ca3ed003f2c54d846768aen,
    0xd1bde49c9a6863f35e49b1925748ad68c79554da106cb5b0ba164bb345bc7c2n,
    0x25e84dda05697ffd603c6cd2d59c391288af9dda8ee41e32db55ced527c17d93n,
    0x33b471ebcfff0d405a6c6d0a510a26e9773984a9a111ead231118161e1d4d4an,
    0x169964a2a16408c161b86350d02544a8f87356ac6496843be92133668689c7f6n,
    0x2013a52d36d1aae326ea687dbee2ddfb54f5de58635256d211ce96e685dd1b89n,
    0x2bbe5d10f1532baf8dd492e5eb1ea9c157ddddcfc8ff5f7315d840daf9c86d1fn,
    0x186ce41133fc24da0157b196fc2ec608be1755f568adee3b35f0e1ad79e10572n,
    0x27db82878e82ebf6f08e23500223779ade5696a5766fd33a50d1a9cf5b729c20n,
    0x1bf13e3c5f70afef01aa85feb33a475e9008d506a956e7bf566ccee4791d4761n,
    0xbe4a53e02142c80f5e7df197663ce96d7b866101a25d002c153064bf5b6e178n,
    0x2eaaf8e549344980af27135a920940e0b63ed4a81fab24e134870470b5fd92dn,
    0xde02b168c6912889554c5b7178af828948ea6285586cbdeeefe5909b3381026n,
    0x2421d938a61e91965988b17440ebc7294f72f0e631823cb97c3d55c57f6327a0n,
    0x2fff43a74dca24a41f54d2151d8b7b8331da7ecc0f1e2fc6403469f8a6fd3ddfn,
    0xd31c0dba8f41b2124d3bedc57c126bbfe487d3ff9907082159ab2d4410f19cbn,
    0x26b31489bf46d4033e8991188f983b5601f236c5148867b7c29dd5715e23769bn,
    0x28b3a22d29ce4cd199d6ba5388bb1450c5c12da31ae4083166bc1225d55a8cc4n,
    0x2d2b9a1a752da92c62c878f2f7516ab7379f27cb8f36963d07cde9294f3ae136n,
    0x24f766e5b6dcf24e4dd35476518f56b1949d2d5e7bb3d95532ecbe123f9b6d04n,
    0x4ce939ca6dc4db5fe03d8ae0c3af4342507c29852df6d2b32173ad52e18ea89n,
    0x13c04e7f19a60fcac71d5b1c202fa397970b3bddac44ba3bd94dbc6851476822n,
    0x2d3d2f7be77dea04a2876d90eef132d69b252827f7df10f9ac453aee12d54b48n,
    0x5c1edda2145bf418a56fd270f0cafe6e08871c4d7d3812bc396ad85ffab8fcfn,
    0x3f6b45ee32eabc8edb111c8e98700dc266f1dc4aae3f16312aa4dbf2f5c0380n,
    0xee73d6cc51f1d78efb760c86edf3d4331fb16f86a6db35f4d46b31d8549944dn,
    0x12ba4aa01e5dc606bda8b8fc3f299db46193a5782d50a1bcefdc0e94221c950en,
    0x5cc2ac369706023d2c3c7f6fbee6dded60b6f67683edfecf9debb42d571eecan,
    0x2d8291b2ea11c9bab14a5b8d90e97556f055b7309a578ed4c6c7b00fb3500d96n,
    0x1bf90513ea3a2baebe9f1385ee9c77a8793f5dd8169f5d7cbab025965de2301fn,
    0xa15c551fc0d7070dc4d267f60ff72c9e904b3b31502783eb6c0010631cf9aaan,
    0x1f8740ed80d145bc4a86d6868da4c8d836d664d66186db03f0ffb9425ef2810n,
    0x136d69d0d4558f877d5552eddaa3f9b9f7244527e6c1ad22178429c6b9d0b9d7n,
    0x14a2853688ccbd47c0eafe1882eeb199db8d5ab08205276ba5cd57bdb83c3e6dn,
    0x4cbce93d6eae95460e20e63512806e8356d50345c6ee6d4cb7de077fc324f5n,
    0x6c7055fde87300596045af03af22d982d55d368ac8cebc27561a8ba26355ad4n,
    0x202a08aca52cd969f597a67c2594eb9615a66bca9724f89e0b30030ad2b2efc0n,
    0x2e372caf8bdea6a29bf979c32b431c1edf44afae6e28c67b1e718096d7dd6fa8n,
    0x9bb96c836be9fcd576b5c5a21e3caf8b14812f77cebef820adb3c386d008487n,
    0x10bc7259d7e3b3c083b3525320849f9e798aab523f63ba2fa484ecb9d89a8c85n,
    0x133a8abe39871ae5125e963508fb3488cc1a8852e6c44b6aff40d416a8550899n,
    0x2a8354d4f248476551ed7eaf10a596eced853559f5ad1fa88e78655c5afa4755n,
    0x25821745d38bc2d849a8c8c4afe309d9e947f9d95e99c71cfb2560e6d25dfcabn,
    0x2397a6a2d491b47f3006468ed0061d5ef144732eb0a2b6c25a7381b4c4c1e505n,
    0x8e4aafcfd1ac6e857d68d1b8d48eff851a2035048ae3c8d8228c1e5c125040fn,
    0x2bd7f2f7662dac759515d7aa54e4fcb202abf64dac5b17d8c44a0a92d6c8796cn,
    0x1a2af993120675707e3b6d320992207249d4a1eda8a5252f1850b627da5b0862n,
    0x376629199627b11598c12f964a4ae5ee8d295f19bc8184de833088ff5ccdd65n,
    0x1784e3c3a6c0166a1cb3b9a5a0ba1bd632b721f7819071bff15f80932f811de8n,
    0x2b019b8e9e77726d963c55e0ab3fe282cab6df2146a94ea224fe7555547fe1c7n,
    0xe877352aaa642f5a0c19036c093131af811eda0448713a6d54b0874cc8d5b70n,
    0x18c0f634c873acf9859f76915b7ae2521fd250e7eed6b1d1ff24de37055dfb15n,
    0x1ad2ebbb74d46aae4d56669d4138810af3a15eadf6ae4bc1e833582be77026ffn,
    0x2d03beb1da522b8ce8ebb17156272caa43105d7219c3fb2a630597f7074671bcn,
    0x26d305fa1cb2e2ca662f2dc188db2cf21b95b65163384577e9a33d869d970f38n,
    0x96bb23032eac37b0df0af315cd2893e936e9a8318b528866acd92a2272a6dadn,
    0x2d933fc2140bd34de933d52633765f8121c556193791a91afa2ebf50f7bcd276n,
    0x239e36992133e2046a7a22ebc6950736cdb0c75aa7ddfef74270ccaa6b288b66n,
    0x67763d04e338af93dd4aaf4a69a6c17b5ad685fc9349c411e6ffe9c1a7ffb84n,
    0x26d785c6c58684fc83509339b84d7f278e946f38b703f47c5e719f647690dc00n,
    0x27d16c08f2f8272dea6dacec7cb2d1f31da63dfbca8da33126f5d4a6c0027bc5n,
    0x162bf90e4cbd605b3a8bad9683c4bb01efda940dc32b506ff935af775f8d01e0n,
    0x2d716b61964c64d55b4490b596f4b3880147a1f18111317e06f0613f159b659fn,
    0x23426276f87e0d64abb5e411501b7ce9d044a9206d768709cef44b03d28ade1en,
    0xfe43649b6d5f7b8c4e8146677925f600b6331f42193df8fe6feffe4bef70255n,
    0x1eb13c8d5fdca21604fa4b5e4be56e77760dc776be6c5ec03ca6421e210c59f4n,
    0x17e783383d1012bc0f89ba1bffc46f9a8c03a5a1b97c0f2bcc55591f14b3c90n,
    0x6aee032420b4383ec622b60fd19dd7a9d61f74d08b6db75215b76b852cf399cn,
    0x2ea58066e2cf3772827948ad04ea16a0b91d621b0f10180c481261174db110c2n,
    0x7ad415cb2925e1351b20a7d2dfb96ed6d61e6cd72d7b2bbec1e7f213b951fb6n,
    0x10baf3e22dd4c544198120e848c12ec636a8a93edd267386ff6328b79decd43fn,
    0x2a6e0c9e6d30c43c538925cdc8268f11466d42aa78970dbc699f8a886fdd07f1n,
    0xc2647a281d2fbee93b16411b40673877a95ba9b979e9b35b7a75a40232fe379n,
    0x2dde352f82dcb0f5173a0bb3e25bc61b5a4f084c1eb3a21e7e4b9a4404595cb4n,
    0x86f26f7bce8820c93e92e7ca921539daf1c029785ba1edab6b77bd6f1705970n,
    0x1121b4d91751036c63145ee4fa8d3f995ef00302e9c63bc78d823d6beaf95c43n,
    0x2948555b5efc93d61bbe517a12cffde9b537ac1d2611ec0ee9aee2c7814b3199n,
    0x15944561c2cce02440f442d6d333dcd647c49a33e8d9d97147c52e9a34f2d0dcn,
    0x9ea436fb3126595833e7bf0a8fa37c94c04ed03915bcd84292a6781bf745674n,
    0xa4d99ea2ab07fa52e0b8c9bcdb9456cab5c77f682a76c332a111503125b42dbn,
    0x21e080f57e386da98e36f7603cd44b3bbb4939238324ea49d71cdbf4f0bca762n,
    0x1a459bb817267f1b7475722dc537e2ff86cce9192db44dc5f6eeff590543622en,
    0x36a43bf2a1baaee4753b5d4a6092d13bd4bf549bf563ee8e02ec3b88603fce6n,
    0x82e026829419bde50e14d3c828c8d8aac5c16b274eddb164c12efe1d3a8ca4n,
    0x18c46acd8b758e19c52f818914ece6b9918f07af08cb6207e6a201cad364e5abn,
    0x29385f03979d4f42409207eb70c88b27387182380b097e0bb1e367bd46aa4700n,
    0x26c80e47192922c2519234d6f80c3b9f380e26d2ae99dc644f44df3eaba34679n,
    0x4f7554f4ec93e2375d8cba4a04260658c0b5897e9f84f60f444b9c4d01c9066n,
    0x139da6e6d57bfd575f490de322652f2c2cfe9e4b947e44ca4b945387e7f9c761n,
    0x2b29fa0667f7a240f1b1eed8fe0cf556f210d34edef7e34dd4748c412c16a4ecn,
    0x1f0fd088d19147cd86d5afb8443266e98efe57b47aa05e8ae97201c9d7d1bcden,
    0x2cc20a56358f3f26dfe4326556e32da4ada8b488374248d0eb2b12cf8a3cbe6dn,
    0x17992a122b8e404713ca9178b52f29339159e5944ce6b65fe55b9354cc0120a3n,
    0x258da17c7980cbdf30ccd780a429b473f0b95f6a0f3de1fea5260d06e0e5b22dn,
    0x1015b7a220170b57624b2bd1797d4076cecc5412dc0d41c786003372274b83cbn,
    0x2fb70a2c4543c3ea1a118d04498d520fb086036c85051f40a8841a83b02a72fbn,
    0x286cc46b8f2d9b6edd17afa8c864416e5e94c38780b9bef3b174986f67913a6bn,
    0x28d630f4a57c11ec5307f15eed2c6dbde8be3d4e4aef979991196922e2c28c73n,
    0x122bd1b90bccdad3801016ce04a9a467f600508c18f2db8798f9cea6a3d4c55fn,
    0x2ac529acaece358479390292170136fcdcf671e1bed3b02e81885699f46b8193n,
    0xeea9b61a21f8fe2d0964e46f8cd2f5c1422d50a29ec1846f2a87b084721fa82n,
    0x2c7a96d6b03bb5f75e019f3914b35bd15aa9d7d2c0e949a05dd106710fb9286n,
    0xdb7ba13cebb252a230efd1fe85b6515ad8070325675ea3861d6478d0223f5afn,
    0x22a89d24d19397ad97d001779c04bf41371d8d326876d4823b693504e0ae400en,
    0xc0b3584e81504b05e7256e4fbd9237c2d82a7d433994a74afadc12bfcea2123n,
    0x1015e12be85132dd4688945002f9f6781809a8166efc179d9dc36a6d262bd411n,
    0x12f830cce6982639b208690f9a9a66dd744f5d74a7e480647126aed11203cf55n,
    0xe75dbb3bf876d56730a7a0377252d2e03d81b3641a627dd2884653e408706afn,
    0x14d86143e6514cfacf15f0da403c3735b78826995fccbee3c3383f5eaccedf90n,
    0xad2a865b04b6ea55a5a87837ebb2df646b37410f5511d76686012440cc294fdn,
    0x1061f470678e82b92988078befee0ec9b0669c9d41dc96e205ab90543f7ae7a6n,
    0x22ce78a79f23c0fd952c94157a13c384fd813c56ee0bbb7608369d640ba64b70n,
    0x28adca358fb7ae1a9d1d17d463871ea6e3ad17155700036eaedb5435ebd53a31n,
    0x43726b7bc8cfa8535d01ca33837e35a3a6fc10d6657611c096e2a267007b7ean,
    0x8634fa6d8f09ce5ca00966828441e7851e0de9c726b36358e0499db551c03d3n,
    0x20eb7bcd0fd0544cb944b6fb6e7bd24458ab1291d78e121bfff0e43ab04abda7n,
    0x12d1cede233b07dcdde8b1d4ad2196cd94433821777406e80dfc00ce5fb01636n,
    0x41a4a53c9ea3b2679913c4b122dd6c578cd16a3c3d5a1f4da4d77b70bf95f52n,
    0x206bb6538f29f5a7b8c37173c70e908ec01224db223bf241dea1eb19afd322ffn,
    0x2abcc3f893810d351e4f973be52fda9c6e9dc08abf989e2a01b0068e49caa3a2n,
    0xf65129ada2d5f49ec784769205cb946d6c9e52ca8605b2281d183fe9b2cba98n,
    0x27d01e6d82510161b8d6993f9ddb2ab0738f6aa9b43f663ed6bdda7a673ea276n,
    0x21cf7747bcd701de344e5bc14fd202d5c727d186bb97901db5a849b9d34c1df8n,
    0x24e62ee220d2b34ea0387182634eea8f59e197aede5b5ce60735affe5bf14012n,
    0x130500fe2fa739eda772b86f0726b49d9549dd320e6bbb7b63b2e703a078042fn,
    0x80e487ea5101e47b12b27d7382c840559451fabdb7e94e0d2649e6ff95a01bbn,
    0x5d788ee55cf8cf1608b26869c6dd5b18e13a8a234a8b9e6e29f3abcf63fcda9n,
    0x219cecf5e2c20ccd0ae6f7557687cb0a5ea98d9cfaf12b9fa7ed95414956e8a7n,
    0x41c294e9d61a0dbbce70b2da328c0848ff5943226127d583d36b51bb8a4aa85n,
    0x22f52f18a78718bca62748581dae3d2fe00bdd9acb70cfab5875248128d45042n,
    0x24986f01c65d94d0771bf866a10f8f60f9974ab874e92ec581841d243f4da81an,
    0x1e58572fc6a0860d89207f0151eaa95df35741eaff3bd57d4824ce38f9d508d2n,
    0x2d9131fdfcd1fd71e51923c209b78d2baa2e4bfb6d76ccb7c859dbbd699af660n,
    0x210a4ca27e64d04b264b627df2afec89d9388a9593f26b4496460b070984d780n,
    0x1db0a2c85010cc8a3dff57b82c42e9cb48ad26caa9ca76cdf2998117f7ecd09an,
    0x2f2688b80ccfabb830bb6a8dc345e4c179b425ccb3cc6452a5bf6f7518930defn,
    0x25841d66960c4e53c1799e347023f5d9e4f122bae1e7c669aeff02b1c6490c40n,
    0x8abe6983a80ea28956c12f3a1dde264bf2a64051f5c13e14d779dc9152853een,
    0x7d3da4bc5c0dd2b12a24b617ba9f25872167ac80b23992dfac18ca95164b53n,
    0x156873246a76682e89c520fdcb563b05420f0b3c871d51b1c51bb967ecf388fen,
    0x28f0ea8a82630f569aae88429a6b3b1cfa9108a216a1c0e25e2e16ea213bf71fn,
    0xe28a4fc7c2bd839a01e532a5b71a0671c1b26330ccf0a69ce54d283994854cen,
    0x2bf4e45c3e6f318b459d487c329350a696fd17660a16ccc154547ff1278c93a1n,
    0x1b6ab48fafe8fcd0baaaf630c01a5253d2afbc6ac5291542dbe76c4d9245decen,
    0x13fd02ad6b8b3f12348a77a5ab615af8591cfbd622859078cedeee1c3cc2e045n,
    0x2672f704c4b607e1d18787e083bec4adb458c45c0db99224674394fb457d2344n,
    0x107a53c45e19bcff5291a7a982f531373f9bcc3e57490f04e20f3a2ccc99b6ban,
    0x1a04b3857955e3ca280324373a1bb827abf1d817dd25f0655d78dcd35b7babd4n,
    0xc36b559f64cba6a5d0703c7e4818c98220fdb71817a9da9bbf3881f6ac16990n,
    0x25aae90755f3a4a5eb5c15d892eaa686345cf8c48092d2ed834094065b149350n,
    0x2e93b8dfb632865e7eac1772682cee1f716a2c1eaa36539769b5ae8c82660342n,
    0x2c3d2effbb4577140dc80059f50fccdcf285e1e17406c9f820ba991a9238dffbn,
    0x28d08f5064280e838119bdaa0113e4f12224b344d45cc35ad9a8750d2ce310f5n,
    0x1415329f0498ee945e705022c80247b4e18302406e6b5aa6adc391fefcbd7769n,
    0x24fd8b29ed3b4f5bbc112280cf797638f8c31fc019a785d0d855686eccc98ca8n,
    0x27ec2739870fb66c9c5abd628e23654c1f39a20ac369dbc951f89eecc416bd33n,
    0x2afb0f24ee6e04c3e0d62e2fcf6442157757f8a2f832573f3c3b6176f51c5761n,
    0x275bc85bb103d88832553592c735f9c9ecb4852fef8c00558a659177b1b76405n,
    0x742afa8cf593fdb5dd3daef5b67a771b4597f912dec95bcb4f87ed362cf1bd4n,
    0x2ede84d5eabfb22171908cac51965acf34fa98b943c8c98003c83f37b1abef19n,
    0x612da87ad62c928fe227d444d102af33b237c663066d6d11f0ae806aab64578n,
    0x172b1bfa1bdae39fde4cc889fb4d7ce558cf44effbef61f5c1b0a5f186225e48n,
    0xe5a05dfa3cc4522883ba9c9cfa2d4b70586c2ffa187235758d6d5b3c3379839n,
    0x235db6a944bfad8d08b06904974b5751a6658acac745e497b96ed53c83943057n,
    0x1a7a04f9b6ef8ecd2cb1e67b730c99551df7c2a459872bb700ee1c9fa962ce66n,
    0x5c8bd8b29d49f888ae5fc268377242a5717d60752ea4fa5fa0e418d3980d8bfn,
    0x128bdf354bf863c84ae3a6cef17c42e1cfa3e7a4601c65493f208ef6b5b9f044n,
    0xa7b34763aefe8acf605b101ea58011be88305e430777afd98166cc1b926fd2dn,
    0x2d55da597f53711a24a9496574bc585fde6cc148559886037c0d8b16f1b91a6cn,
    0x1efe7d901eeac214520425beb73aafbe04cdc31f6a751b52f8101716c76bd8b9n,
    0x1800ec01eb6c018970dcb109330d4bab5d185981d28b3c51a2d9881dda6a9954n,
    0x335af83ac50271954075e55c6e609fc2a20ca646ebb1fc71454028f3acb0509n,
    0x21b68a2314cf32ee27ff2d980ef2caadc6e712a7fd8cd51c93a2a347211aa972n,
    0x0n]

mimc_round_constants_mont = mimc_round_constants_mont.map((x) => bigint_to_le_hexstring(x))

// TODO move this into bigint_to_le_hexstring
mimc_round_constants_mont = mimc_round_constants_mont.map((x) => {
    if (x.length != 64) {
        x = x + '00'
    }
    return x
})

module.exports.mimc_round_constants_mont = mimc_round_constants_mont
