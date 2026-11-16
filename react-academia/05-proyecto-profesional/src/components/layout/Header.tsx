import { NavLink, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loggedOut } from "../../features/auth/authSlice";
import { LanguageSelector } from "../ui/LanguageSelector";

export function Header() {
  const { t } = useTranslation();
  const amount = useAppSelector((state) => state.myCourses.ids.length);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(loggedOut());
    navigate("/");
  }

  return (
    <header className="header">
      <strong>Academia</strong>
      <nav>
        <NavLink to="/" end>
          {t("menu.courses")}
        </NavLink>
        <NavLink to="/my-courses">{t("menu.myCourses", { amount })}</NavLink>
        {user?.role === "admin" && <NavLink to="/admin">{t("menu.admin")}</NavLink>}
        {user ? (
          <>
            <span>{t("menu.hello", { name: user.name })}</span>
            <button onClick={logout}>{t("menu.logout")}</button>
          </>
        ) : (
          <NavLink to="/login">{t("menu.login")}</NavLink>
        )}
        <LanguageSelector />
      </nav>
    </header>
  );
}
