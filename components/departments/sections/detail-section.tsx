"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActionLink } from "@/components/shared";
import departmentsContent from "@/content/departments.json";
import DepartmentsQr from "../departments-qr";
import styles from "./detail-section.module.css";

export default function DepartmentsDetailSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const groupedDepartments = useMemo(
    () =>
      departmentsContent.hero.groups.map((group) => ({
        ...group,
        items: departmentsContent.details.tabs.filter((department) => department.group === group.title),
      })),
    [],
  );

  const firstGroup = groupedDepartments[0];
  const firstDepartment = firstGroup?.items[0];

  const [openGroupId, setOpenGroupId] = useState(firstGroup?.id ?? "");
  const [activeDepartmentId, setActiveDepartmentId] = useState(firstDepartment?.id ?? "");

  const activeDepartment =
    departmentsContent.details.tabs.find((department) => department.id === activeDepartmentId) ?? firstDepartment;
  const departmentMoreLink =
    activeDepartment &&
    activeDepartment.moreLink.text.trim() &&
    activeDepartment.moreLink.href.trim()
      ? activeDepartment.moreLink
      : null;

  const selectDepartment = useCallback(
    (departmentId: string, shouldScroll = false) => {
      const department = departmentsContent.details.tabs.find((item) => item.id === departmentId);

      if (!department) {
        return;
      }

      const parentGroup = groupedDepartments.find((group) => group.title === department.group);

      setActiveDepartmentId(department.id);

      if (parentGroup) {
        setOpenGroupId(parentGroup.id);
      }

      if (shouldScroll) {
        requestAnimationFrame(() => {
          const target = document.getElementById(`department-${department.id}`) ?? sectionRef.current;

          if (!(target instanceof HTMLElement)) {
            return;
          }

          const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          target.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "start",
          });
        });
      }
    },
    [groupedDepartments],
  );

  useEffect(() => {
    const syncFromHash = () => {
      const hash = decodeURIComponent(window.location.hash);

      if (!hash.startsWith("#department-")) {
        return;
      }

      selectDepartment(hash.replace("#department-", ""), true);
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    return () => {
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [selectDepartment]);

  const handleGroupToggle = (groupId: string, firstItemId?: string) => {
    setOpenGroupId((current) => {
      if (current === groupId) {
        return "";
      }

      if (firstItemId) {
        setActiveDepartmentId(firstItemId);
      }

      return groupId;
    });
  };

  return (
    <section ref={sectionRef} id="department-details" className={styles.detailSection}>
      <div className={styles.detailInner}>
        <header className={styles.detailHeader}>
          <p className={styles.sectionLabel}>{departmentsContent.details.eyebrow}</p>
          <h2 className={styles.sectionTitle}>{departmentsContent.details.title}</h2>
          <p className={styles.sectionLead}>{departmentsContent.details.intro}</p>
        </header>

        <div className={styles.detailLayout}>
          <aside className={styles.sidebar}>
            {groupedDepartments.map((group) => {
              const isOpen = group.id === openGroupId;

              return (
                <section key={group.id} className={`${styles.groupPanel} ${isOpen ? styles.groupPanelOpen : ""}`}>
                  <button type="button" className={styles.groupToggle} aria-expanded={isOpen} onClick={() => handleGroupToggle(group.id, group.items[0]?.id)}>
                    <div className={styles.groupToggleCopy}>
                      <p className={styles.groupEyebrow}>{group.subtitle}</p>
                      <h3 className={styles.groupTitle}>{group.title}</h3>
                    </div>
                    <span className={`${styles.groupIndicator} ${isOpen ? styles.groupIndicatorOpen : ""}`}>{isOpen ? "−" : "+"}</span>
                  </button>

                  <div className={`${styles.departmentListWrap} ${isOpen ? styles.departmentListWrapOpen : ""}`}>
                    <div className={styles.departmentList}>
                      {group.items.map((department) => (
                        <button key={department.id} type="button" className={`${styles.departmentButton} ${department.id === activeDepartment?.id ? styles.departmentButtonActive : ""}`} onClick={() => selectDepartment(department.id)}>
                          {department.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}
          </aside>

          {activeDepartment ? (
            <article key={activeDepartment.id} id={`department-${activeDepartment.id}`} className={styles.departmentCard}>
              <header className={styles.departmentHeader}>
                <div>
                  <p className={styles.departmentMeta}>{activeDepartment.group}</p>
                  <div className={styles.departmentTitleRow}>
                    <h3 className={styles.departmentName}>{activeDepartment.name}</h3>
                    {departmentMoreLink ? (
                      <ActionLink href={departmentMoreLink.href} className={styles.sectionLink} openInNewTab>
                        {departmentMoreLink.text}
                      </ActionLink>
                    ) : null}
                  </div>
                </div>
                <p className={styles.departmentTagline}>{activeDepartment.tagline}</p>
              </header>

              <div className={styles.departmentBody}>
                <div className={styles.copyBlock}>
                  {activeDepartment.paragraphs.map((paragraph) => (
                    <p key={paragraph} className={styles.departmentText}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className={styles.infoGrid}>
                  <section className={styles.infoCard}>
                    <p className={styles.infoTitle}>招新方式</p>
                    <p className={styles.recruitmentText}>{activeDepartment.recruitment}</p>
                  </section>

                  {activeDepartment.group != "管理部门" && (
                    <section className={styles.infoCard}>
                      <p className={styles.infoTitle}>招新群二维码</p>
                      <DepartmentsQr
                        src={activeDepartment.qrCode || undefined}
                        alt={`${activeDepartment.name} 招新群二维码`}
                        width={480}
                        height={480}
                        className={styles.qrCard}
                      />
                    </section>
                  )}
                </div>
              </div>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
}
