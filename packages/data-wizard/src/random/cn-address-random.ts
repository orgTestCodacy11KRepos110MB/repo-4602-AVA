import { BasicRandom } from './basic-random';
import dict from './cn-address-dict';

// prettier-ignore
const countries = ['阿富汗','奥兰群岛(芬兰属)','阿尔巴尼亚','阿尔及利亚','美属萨摩亚','安道尔','安哥拉','安圭拉岛','南极洲','安提瓜和巴布达','阿根廷','亚美尼亚','阿鲁巴','澳大利亚','奥地利','阿塞拜疆','巴哈马','巴林','孟加拉国','巴巴多斯','白俄罗斯','比利时','伯利兹','贝宁','百慕大群岛','不丹','玻利维亚','波斯尼亚和黑塞哥维那','博茨瓦纳','布韦岛','巴西','英属印度洋领地','文莱','保加利亚','布基纳法索','布隆迪','柬埔寨','喀麦隆','加拿大','佛得角','开曼群岛','中非共和国','乍得','智利','中国','圣诞岛','科科斯群岛（基灵群岛）','哥伦比亚','科摩罗','刚果','刚果民主共和国','库克群岛','哥斯达黎加','科特迪瓦','克罗地亚','古巴','塞浦路斯','捷克共和国','丹麦','吉布提','多米尼加','多米尼加共和国','厄瓜多尔','埃及','萨尔瓦多','赤道几内亚','厄立特里亚','爱沙尼亚','埃塞俄比亚','福克兰群岛(马尔维纳斯群岛)','法罗群岛','斐济群岛','芬兰','法国','法属圭亚那','法属波利尼西亚','法属南极地区','加蓬','冈比亚','乔治亚','德国','加纳','直布罗陀','希腊','格陵兰','格林纳达','瓜德罗普岛','关岛','危地马拉','格恩西','几内亚','几内亚比绍','圭亚那','海地','赫德和麦克唐纳群岛','梵蒂冈城','洪都拉斯','匈牙利','冰岛','印度','印度尼西亚','伊朗','伊拉克','爱尔兰','马恩岛','以色列','意大利','牙买加','日本','泽西','约旦','哈萨克斯坦','肯尼亚','基里巴斯','朝鲜','韩国','科威特','吉尔吉斯斯坦','老挝','拉脱维亚','黎巴嫩','莱索托','利比里亚','利比亚','列支敦士登','立陶宛','卢森堡','马其顿,前南斯拉夫共和国','马达加斯加','马拉维','马来西亚','马尔代夫','马里','马耳他','马绍尔群岛','马提尼克岛','毛里塔尼亚','毛里求斯','马约特岛','墨西哥','密克罗尼西亚','摩尔多瓦','摩纳哥','蒙古','门的内哥罗(黑山)','蒙特塞拉特','摩洛哥','莫桑比克','缅甸','纳米比亚','瑙鲁','尼泊尔','荷兰','荷属安的列斯群岛','新喀里多尼亚','新西兰','尼加拉瓜','尼日尔','尼日利亚','纽埃','诺福克岛','北马里亚纳群岛','挪威','阿曼','巴基斯坦','帕劳群岛','巴勒斯坦当局','巴拿马','巴布亚新几内亚','巴拉圭','秘鲁','菲律宾','皮特克恩群岛','波兰','葡萄牙','波多黎各','卡塔尔','留尼汪岛','罗马尼亚','俄罗斯','卢旺达','圣巴泰勒米','圣赫勒拿岛','圣基茨和尼维斯','圣卢西亚','圣马丁','圣皮埃尔岛和密克隆岛','圣文森特和格林纳丁斯','萨摩亚','圣马力诺','圣多美和普林西比','沙特阿拉伯','塞内加尔','塞尔维亚','塞舌尔','塞拉利昂','新加坡','斯洛伐克','斯洛文尼亚','所罗门群岛','索马里','南非','南乔治亚和南桑德威奇群岛','西班牙','斯里兰卡','苏丹','苏里南','斯瓦尔巴群岛和扬马延','斯威士兰','瑞典','瑞士','叙利亚','塔吉克斯坦','坦桑尼亚','泰国','东帝汶','多哥','托克劳','汤加','特立尼达和多巴哥','突尼斯','土耳其','土库曼斯坦','特克斯群岛和凯科斯群岛','图瓦卢','乌干达','乌克兰','阿拉伯联合酋长国','英国','美国','美属小奥特兰群岛','乌拉圭','乌兹别克斯坦','瓦努阿图','委内瑞拉','越南','维尔京群岛（英属）','维尔京群岛','瓦利斯群岛和富图纳群岛','西撒哈拉','也门','赞比亚','津巴布韦'];

/**
 * Generator for address
 *
 * @public
 */
export class CnAddressRandom extends BasicRandom {
  /**
   * Generate a country name in chainese
   */
  country(): string {
    return this.pickone(countries);
  }

  /**
   * Generate a chainese province
   */
  province(): string {
    const p = this.pickone(dict);
    return p.n;
  }

  /**
   * return a random chinese city name
   */
  city(): string {
    const p = this.pickone(dict);
    const c = this.pickone(p.c);
    return c.n;
  }

  /**
   * return a random chinese district name
   */
  district(): string {
    const p = this.pickone(dict);
    let c = this.pickone(p.c);
    let count = p.c.length - 1;
    while (c.c === undefined) {
      if (count <= 0) {
        return this.district();
      }
      c = this.pickone(p.c);
      count -= 1;
    }
    return this.pickone(c.c).n;
  }

  /**
   * return a random chinese road name
   */
  road(): string {
    const suffixes = ['大道', '路', '街', '胡同'];
    // {@link http://www.sohu.com/a/329066696_99979179}
    // {@link https://baike.baidu.com/tashuo/browse/content?id=b7a9e6fb3d50c9bb99f1fe3b}
    // prettier-ignore
    const roads = ['中山','朝阳','大同','文昌','长春','东方','桃园','北京','兴安','南京','南昌','上海','工业','文化','青年','人民','建设','和平','光明','复兴','朝阳','胜利','自强','太平','幸福','成功','永兴','仁爱','兴业','平安','创业','健康','阳光','牡丹','竹子','世纪','兰花','梅花','桂花','海桐','白杨','银霄','龙溪','斜阳','万花','沧浪','芒涌','绿玉','嵩山','黄山','衡山','长江','黄河','珠江','同福','兴华','吉祥','团结','长寿','友爱','仁廉','祖冲之','李时珍','郭守敬','李冰','张衡','沈括','蔡伦','华佗','毕升','达尔文','伽利略','法拉第','牛顿','居里','哈雷路'];
    return `${this.pickone(roads)}${this.pickone(suffixes)}`;
  }

  /**
   * return a random chinese address name
   */
  address(): string {
    const pcd: string[] = [];
    let c: any[] = dict;
    while (c) {
      const target = this.pickone(c);
      pcd.push(target.n);
      c = target.c;
    }
    return `${pcd.join('')}${this.road()}${this.natural({ min: 1, max: 1000 })}号`;
  }

  /** return a random post code */
  postcode(): string {
    return this.n(this.natural, 6, { min: 0, max: 9 }).join('');
  }
}
