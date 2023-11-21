import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/DeleteChecklistItem")
public class DeleteChecklistItem extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");

        String selectedPerson = request.getParameter("selectedPerson");
        String itemToDelete = request.getParameter("itemToDelete");

        // 체크리스트를 검색
        HashMap<String, ArrayList<String>> checklists = (HashMap<String, ArrayList<String>>) request
                .getSession().getAttribute("checklists");

        if (checklists != null && checklists.containsKey(selectedPerson)) {
            // 선택된 사용자의 체크리스트를 검색
            ArrayList<String> checklist = checklists.get(selectedPerson);

            // 체크리스트에서 항목을 제거
            checklist.remove(itemToDelete);

            // 업데이트된 체크리스트를 세션에 다시 설정
            request.getSession().setAttribute("checklists", checklists);

            // 업데이트된 체크리스트를 속성으로 설정
            request.setAttribute("checklist", checklist);
            request.setAttribute("selectedPerson", selectedPerson);
        }

        // 업데이트된 체크리스트를 표시하기 위해 index.jsp로 포워딩
        RequestDispatcher dispatcher = request.getRequestDispatcher("index.jsp");
        dispatcher.forward(request, response);
    }
}
