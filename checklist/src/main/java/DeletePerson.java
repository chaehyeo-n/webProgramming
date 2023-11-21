import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/DeletePerson")
public class DeletePerson extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");

        String personToDelete = request.getParameter("personToDelete");

        // 체크리스트를 검색
        HashMap<String, ArrayList<String>> checklists = (HashMap<String, ArrayList<String>>) request
                .getSession().getAttribute("checklists");

        if (checklists != null && checklists.containsKey(personToDelete)) {
            // 사용자와 그들의 체크리스트를 제거
            checklists.remove(personToDelete);

            // 업데이트된 체크리스트를 세션에 다시 설정
            request.getSession().setAttribute("checklists", checklists);
        }

        // personToDelete를 personList에서 제거
        ArrayList<String> personList = new ArrayList<>(checklists.keySet());
        personList.remove(personToDelete);

        // 업데이트된 personList를 속성으로 설정
        request.getSession().setAttribute("personList", personList);

        // 업데이트된 목록을 표시하기 위해 index.jsp로 리디렉션
        response.sendRedirect("index.jsp");
    }
}
