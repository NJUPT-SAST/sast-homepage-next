import { Backgroud1 } from "@/components/shared";
import pageStyles from "./not-found.module.css";

const TIPS = ["页面链接已经更新", "内容仍在建设中", "输入地址时多了或少了字符"];

export function NotFoundSection() {
  return (
    <section className={pageStyles.notFoundSection}>
      <Backgroud1 />

      <div className={pageStyles.content}>
        <p className={pageStyles.code}>404</p>
        <h1 className={pageStyles.title}>页面暂时迷路了</h1>
        <p className={pageStyles.description}>您可以先返回首页，或者查看更多有关 SAST 的内容。</p>

        <div className={pageStyles.tipCard}>
          <p className={pageStyles.tipTitle}>可能是这些情况</p>
          <ul className={pageStyles.tipList}>
            {TIPS.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
          <p className={pageStyles.tipFooter}>如果您确信地址正确，请联系网站管理员</p>
        </div>
      </div>
    </section>
  );
}
